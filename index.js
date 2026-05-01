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
let dbConnectionPromise = null;

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

  if (!hasMongoConfig()) {
    return res.status(500).json({
      message: "Server is missing MongoDB configuration. Please contact support."
    });
  }

  const connected = await connectToDatabase();
  if (!connected || !isDatabaseConnected()) {
    return res.status(503).json({
      message: "Contact service is temporarily unavailable. Please try again shortly."
    });
  }

  try {
    await ContactMessage.create(payload);

    return res.json({
      message: `Thank you ${firstName}, your message has been received by SSDDA Farm.`
    });
  } catch (error) {
    console.error("Failed to save contact message:", error.message);
    return res.status(500).json({
      message: "Unable to save your message right now. Please try again."
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
