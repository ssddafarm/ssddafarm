import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 5051;
const host = process.env.HOST || "0.0.0.0";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, "../dist");
const mongoUri = (process.env.MONGODB_URI || "").trim();
const mongoDbName = (process.env.MONGODB_DB_NAME || "ssddform").trim();
const googleFormActionUrl = (process.env.GOOGLE_FORM_ACTION_URL || "").trim();
let dbConnectionPromise = null;
const mockFeedbackByProduct = {
  makhana: [
    { rating: 5, message: "Fresh and crunchy. Perfect tea-time snack." },
    { rating: 4, message: "Good quality and clean packing. Will order again." },
    { rating: 5, message: "Very light and tasty. Family loved it." },
    { rating: 4, message: "Balanced flavor and nice texture." },
    { rating: 5, message: "Premium size seeds and great taste." },
    { rating: 3, message: "Overall good, could use a little less salt." }
  ],
  moringa: [
    { rating: 5, message: "Mixes well in smoothies and tastes natural." },
    { rating: 4, message: "Good aroma and color. Feels fresh." },
    { rating: 5, message: "Great daily wellness addition." },
    { rating: 4, message: "Packaging is clean and easy to store." },
    { rating: 3, message: "Bit earthy for me, but quality is nice." },
    { rating: 5, message: "Noticeably fresh powder compared to others." }
  ],
  flaxseed: [
    { rating: 5, message: "Very clean seeds and consistent quality." },
    { rating: 4, message: "Good crunch and value for money." },
    { rating: 5, message: "Excellent for adding to breakfast bowls." },
    { rating: 4, message: "Fresh stock and proper packing." },
    { rating: 5, message: "Great quality, works well in smoothies." },
    { rating: 3, message: "Decent product, delivery was a little late." }
  ]
};

function createMockFeedbackSeed() {
  const seededEntries = [];
  const now = Date.now();
  const hourMs = 60 * 60 * 1000;
  let offset = 0;

  Object.entries(mockFeedbackByProduct).forEach(([productId, entries]) => {
    entries.forEach((entry) => {
      seededEntries.push({
        productId,
        rating: entry.rating,
        message: entry.message,
        timestamp: new Date(now - offset * hourMs).toISOString()
      });
      offset += 1;
    });
  });

  return seededEntries;
}

const inMemoryStore = {
  contacts: [],
  feedback: createMockFeedbackSeed(),
  newsletters: []
};

const contactMessageSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    company: { type: String, default: "", trim: true },
    inquiryType: { type: String, default: "", trim: true },
    quantity: { type: String, default: "", trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

const ContactMessage =
  mongoose.models.ContactMessage ||
  mongoose.model("ContactMessage", contactMessageSchema);

const productFeedbackSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, trim: true, index: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    message: { type: String, required: true, trim: true, maxlength: 1200 }
  },
  { timestamps: true }
);

const ProductFeedback =
  mongoose.models.ProductFeedback ||
  mongoose.model("ProductFeedback", productFeedbackSchema);

const newsletterSubscriptionSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true
    }
  },
  { timestamps: true }
);

const NewsletterSubscription =
  mongoose.models.NewsletterSubscription ||
  mongoose.model("NewsletterSubscription", newsletterSubscriptionSchema);

function normalizeGoogleFormEntryKey(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed) {
    return "";
  }

  return trimmed.startsWith("entry.") ? trimmed : `entry.${trimmed}`;
}

const googleFormEntryMap = {
  firstName: normalizeGoogleFormEntryKey(process.env.GOOGLE_FORM_ENTRY_FIRST_NAME),
  lastName: normalizeGoogleFormEntryKey(process.env.GOOGLE_FORM_ENTRY_LAST_NAME),
  email: normalizeGoogleFormEntryKey(process.env.GOOGLE_FORM_ENTRY_EMAIL),
  company: normalizeGoogleFormEntryKey(process.env.GOOGLE_FORM_ENTRY_COMPANY),
  inquiryType: normalizeGoogleFormEntryKey(process.env.GOOGLE_FORM_ENTRY_INQUIRY_TYPE),
  quantity: normalizeGoogleFormEntryKey(process.env.GOOGLE_FORM_ENTRY_QUANTITY),
  subject: normalizeGoogleFormEntryKey(process.env.GOOGLE_FORM_ENTRY_SUBJECT),
  message: normalizeGoogleFormEntryKey(process.env.GOOGLE_FORM_ENTRY_MESSAGE)
};

function normalizeContactPayload(payload = {}) {
  return {
    firstName: String(payload.firstName || "").trim(),
    lastName: String(payload.lastName || "").trim(),
    email: String(payload.email || "").trim().toLowerCase(),
    company: String(payload.company || "").trim(),
    inquiryType: String(payload.inquiryType || "").trim(),
    quantity: String(payload.quantity || "").trim(),
    subject: String(payload.subject || "").trim(),
    message: String(payload.message || "").trim()
  };
}

function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}

function hasMongoConfig() {
  return Boolean(mongoUri);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeFeedbackPayload(payload = {}) {
  return {
    productId: String(payload.productId || "").trim(),
    rating: Number(payload.rating),
    message: String(payload.message || "").trim()
  };
}

function normalizeNewsletterPayload(payload = {}) {
  return {
    email: String(payload.email || "").trim().toLowerCase()
  };
}

function toClientFeedbackItem(entry) {
  return {
    productId: entry.productId,
    rating: Number(entry.rating),
    message: entry.message,
    timestamp: entry.createdAt || entry.timestamp || new Date().toISOString()
  };
}

function hasGoogleFormConfig() {
  const hasAnyEntry = Object.values(googleFormEntryMap).some(Boolean);
  return Boolean(googleFormActionUrl) && hasAnyEntry;
}

async function submitContactToGoogleForm(contactPayload) {
  if (!hasGoogleFormConfig()) {
    return { attempted: false, success: false, reason: "Google Form config missing" };
  }

  const body = new URLSearchParams();

  Object.entries(googleFormEntryMap).forEach(([field, entryKey]) => {
    if (!entryKey) {
      return;
    }
    body.set(entryKey, contactPayload[field] || "");
  });

  try {
    const response = await fetch(googleFormActionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: body.toString(),
      redirect: "follow"
    });

    if (!response.ok) {
      return {
        attempted: true,
        success: false,
        reason: `Google Form rejected request with status ${response.status}`
      };
    }

    return { attempted: true, success: true, reason: "" };
  } catch (error) {
    return {
      attempted: true,
      success: false,
      reason: error?.message || "Google Form request failed"
    };
  }
}

async function connectToDatabase() {
  if (!hasMongoConfig()) {
    console.warn("MONGODB_URI is not set. Contact messages will not be stored.");
    return false;
  }

  if (isDatabaseConnected()) {
    return true;
  }

  if (!dbConnectionPromise) {
    dbConnectionPromise = mongoose
      .connect(mongoUri, { serverSelectionTimeoutMS: 5000, dbName: mongoDbName })
      .then(() => {
        console.log("Connected to MongoDB.");
        return true;
      })
      .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
        return false;
      })
      .finally(() => {
        dbConnectionPromise = null;
      });
  }

  return dbConnectionPromise;
}

app.use(cors());
app.use(express.json());

app.post("/api/contact", async (req, res) => {
  const payload = normalizeContactPayload(req.body);
  const { firstName, lastName, email, subject, message } = payload;

  if (!firstName || !lastName || !email || !subject || !message) {
    return res.status(400).json({
      message: "Please fill in all fields before sending your message."
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      message: "Please enter a valid email address."
    });
  }

  if (hasMongoConfig() && !isDatabaseConnected()) {
    await connectToDatabase();
  }

  try {
    const googleFormResult = await submitContactToGoogleForm(payload);
    if (!googleFormResult.success) {
      console.warn("Contact saved without Google Form sync:", googleFormResult.reason);
    }

    if (isDatabaseConnected()) {
      await ContactMessage.create(payload);
    } else {
      inMemoryStore.contacts.unshift({ ...payload, timestamp: new Date().toISOString() });
      inMemoryStore.contacts = inMemoryStore.contacts.slice(0, 200);
    }

    return res.json({
      message: `Thank you ${firstName}, your message has been received by SSDDA Farm.`,
      googleFormSynced: Boolean(googleFormResult.success),
      googleFormStatus: googleFormResult.success
        ? "synced"
        : googleFormResult.attempted
          ? "failed"
          : "skipped",
      googleFormReason: googleFormResult.reason || ""
    });
  } catch (error) {
    console.error("Failed to save contact message:", error.message);
    return res.status(500).json({
      message: "Unable to save your message right now. Please try again."
    });
  }
});

app.get("/api/feedback", async (req, res) => {
  const productId = String(req.query.productId || "").trim();

  if (!productId) {
    return res.status(400).json({
      message: "Product id is required."
    });
  }

  if (hasMongoConfig() && !isDatabaseConnected()) {
    await connectToDatabase();
  }

  try {
    if (isDatabaseConnected()) {
      const feedback = await ProductFeedback.find({ productId })
        .sort({ createdAt: -1 })
        .limit(20)
        .lean();

      if (feedback.length > 0) {
        return res.json({
          productId,
          feedback: feedback.map(toClientFeedbackItem)
        });
      }

      const fallbackMockFeedback = (mockFeedbackByProduct[productId] || []).map((entry, index) => ({
        productId,
        rating: entry.rating,
        message: entry.message,
        timestamp: new Date(Date.now() - index * 60 * 60 * 1000).toISOString()
      }));

      return res.json({
        productId,
        feedback: fallbackMockFeedback
      });
    }

    const feedback = inMemoryStore.feedback
      .filter((entry) => entry.productId === productId)
      .slice(0, 20)
      .map(toClientFeedbackItem);
    return res.json({
      productId,
      feedback
    });
  } catch (error) {
    console.error("Failed to read feedback:", error.message);
    return res.status(500).json({
      message: "Unable to load feedback right now."
    });
  }
});

app.post("/api/feedback", async (req, res) => {
  const payload = normalizeFeedbackPayload(req.body);
  const { productId, rating, message } = payload;

  if (!productId || !message) {
    return res.status(400).json({
      message: "Please provide product and feedback message."
    });
  }

  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({
      message: "Rating must be between 1 and 5."
    });
  }

  if (hasMongoConfig() && !isDatabaseConnected()) {
    await connectToDatabase();
  }

  try {
    if (isDatabaseConnected()) {
      const created = await ProductFeedback.create(payload);
      return res.status(201).json({
        message: "Thank you for your feedback.",
        feedback: toClientFeedbackItem(created.toObject())
      });
    }

    const feedbackEntry = {
      ...payload,
      timestamp: new Date().toISOString()
    };
    inMemoryStore.feedback.unshift(feedbackEntry);
    inMemoryStore.feedback = inMemoryStore.feedback.slice(0, 400);

    return res.status(201).json({
      message: "Thank you for your feedback.",
      feedback: toClientFeedbackItem(feedbackEntry)
    });
  } catch (error) {
    console.error("Failed to save feedback:", error.message);
    return res.status(500).json({
      message: "Unable to save feedback right now. Please try again."
    });
  }
});

app.post("/api/newsletter", async (req, res) => {
  const payload = normalizeNewsletterPayload(req.body);
  const { email } = payload;

  if (!isValidEmail(email)) {
    return res.status(400).json({
      message: "Please enter a valid email address."
    });
  }

  if (hasMongoConfig() && !isDatabaseConnected()) {
    await connectToDatabase();
  }

  try {
    if (isDatabaseConnected()) {
      const existing = await NewsletterSubscription.findOne({ email }).lean();
      if (existing) {
        return res.status(200).json({
          message: "You are already subscribed to our newsletter."
        });
      }

      await NewsletterSubscription.create(payload);
      return res.status(201).json({
        message: "Thanks for subscribing to SSDDA Farm updates."
      });
    }

    const alreadyExists = inMemoryStore.newsletters.some((item) => item.email === email);
    if (alreadyExists) {
      return res.status(200).json({
        message: "You are already subscribed to our newsletter."
      });
    }

    inMemoryStore.newsletters.unshift({ email, timestamp: new Date().toISOString() });
    inMemoryStore.newsletters = inMemoryStore.newsletters.slice(0, 500);

    return res.status(201).json({
      message: "Thanks for subscribing to SSDDA Farm updates."
    });
  } catch (error) {
    console.error("Failed to save newsletter subscription:", error.message);
    return res.status(500).json({
      message: "Unable to subscribe right now. Please try again."
    });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    mongoConfigured: hasMongoConfig(),
    mongoDatabase: mongoDbName,
    database: isDatabaseConnected() ? "connected" : "disconnected"
  });
});

app.use(express.static(distPath));

app.get("*", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

async function startServer() {
  await connectToDatabase();

  app.listen(port, host, () => {
    console.log(`SSDDA Farm server running on http://${host}:${port}`);
  });
}

startServer();
