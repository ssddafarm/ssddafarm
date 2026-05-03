import { useEffect, useState } from "react";
import heroFarm from "./assets/hero-farm.svg";
import makhanaImage from "./assets/makhana.jpeg";
import moringaImage from "./assets/moringa_powder.jpeg";
import flaxseedImage from "./assets/flaxseed.jpeg";
import ssddaLogo from "./assets/ssdda-logo.jpeg";

const benefits = [
  "Fresh batches prepared with care",
  "Natural ingredients and honest sourcing",
  "Healthy snack options families trust"
];

const businessPoints = [
  {
    title: "Purity First",
    text: "We focus on clean ingredients, careful handling, and honest food values."
  },
  {
    title: "Farm To Home",
    text: "Our products carry farm-inspired freshness from sourcing to final packing."
  },
  {
    title: "Built For Trust",
    text: "Quality, hygiene, and consistency shape every SSDDA Farm product."
  }
];

const products = [
  {
    id: "makhana",
    badge: "Best Seller",
    name: "Premium Makhana",
    price: "Farm-fresh snack",
    image: makhanaImage,
    marketplace: {
      amazon: "https://www.amazon.in/s?k=ssdda+farm+makhana",
      flipkart: "https://www.flipkart.com/search?q=ssdda+farm+makhana"
    },
    teaser:
      "Low in fat, gluten-free, and rich in protein and fiber for everyday healthy snacking.",
    intro:
      "Makhana, also called fox nuts or lotus seeds, is a popular healthy snack made from the seeds of Euryale ferox. It is especially famous in Bihar, India, which produces most of the world's supply.",
    facts: [
      "Scientific name: Euryale ferox",
      "Common names: Makhana, Fox nuts, Lotus seeds, Phool makhana",
      "Plant family: Nymphaeaceae",
      "Origin: South and East Asia",
      "Major producer: India, especially Bihar",
      "Form: Puffed edible seeds"
    ],
    process: [
      "Cultivation in ponds, wetlands, and shallow lakes.",
      "Underwater seed collection by farmers.",
      "Sun drying after harvest.",
      "Roasting and popping to create fluffy makhana."
    ],
    nutrition: [
      "Calories: about 350 kcal per 100 g",
      "Protein: 9-10 g",
      "Carbohydrates: 75 g",
      "Fat: 0.5 g",
      "Fiber: 7-14 g",
      "Calcium: 60 mg",
      "Magnesium: 67 mg",
      "Potassium: 500 mg"
    ],
    health: [
      "Supports heart health with low sodium and high magnesium.",
      "Helps weight management by keeping you full longer.",
      "Useful for blood sugar control because of its low glycemic index.",
      "Supports digestion with fiber.",
      "Contains antioxidants like flavonoids.",
      "Provides calcium for bone health.",
      "Traditionally used in Ayurveda for kidney support."
    ],
    grades: ["Lava", "Murra", "Thurri", "Katai"],
    summary:
      "Makhana is a nutritious traditional Indian superfood made from lotus seeds. It is rich in protein, fiber, and minerals while staying low in fat.",
    extraSections: [
      {
        title: "Quality Note",
        items: ["Large white seeds are considered premium quality."]
      }
    ]
  },
  {
    id: "moringa",
    badge: "Daily Wellness",
    name: "Moringa Powder",
    price: "Nutrient-dense superfood",
    image: moringaImage,
    marketplace: {
      amazon: "https://www.amazon.in/s?k=ssdda+farm+moringa+powder",
      flipkart: "https://www.flipkart.com/search?q=ssdda+farm+moringa+powder"
    },
    teaser:
      "A powerful green powder made from dried Moringa oleifera leaves, known as the miracle tree.",
    intro:
      "Moringa powder is made from dried leaves of the Moringa oleifera tree and has been used for centuries in Ayurveda. Native to South Asia, it is now grown widely across tropical regions.",
    facts: [
      "Protein: 25-30 g per 100 g",
      "Fiber: 20-25 g",
      "Calcium: around 2000 mg",
      "Iron: around 28 mg",
      "Potassium: around 1300 mg",
      "Magnesium: around 350 mg"
    ],
    vitamins: [
      "Vitamin A",
      "Vitamin B1",
      "Vitamin B2",
      "Vitamin B3",
      "Vitamin C",
      "Vitamin E"
    ],
    compounds: [
      "Antioxidants",
      "Polyphenols",
      "Flavonoids",
      "Chlorogenic acid",
      "Quercetin"
    ],
    health: [
      "Helps fight oxidative stress and inflammation.",
      "May help support healthy blood sugar levels.",
      "Supports heart health by helping with cholesterol and circulation.",
      "Boosts immunity through vitamin C, antioxidants, and iron.",
      "Improves digestion with fiber-rich support.",
      "Supports brain health and daily energy.",
      "May support weight management as part of a healthy routine.",
      "Supports skin glow, stronger hair, and a healthy scalp."
    ],
    usage: [
      "Mix 1 teaspoon with warm water, lemon, and honey.",
      "Blend into smoothies or protein shakes.",
      "Add to soups, dal, roti dough, salads, or yogurt.",
      "Use in tea with hot water."
    ],
    dosage: "Typical intake is 1-2 teaspoons per day. Beginners should start with half a teaspoon.",
    caution:
      "Too much may cause nausea, diarrhea, stomach upset, low blood pressure, or low blood sugar. Pregnant women should avoid high doses.",
    summary:
      "Moringa powder is one of the most nutrient-dense plant foods available and can be a strong addition to a healthy routine when used in moderate amounts.",
    extraSections: [
      {
        title: "Where It Is Grown",
        items: [
          "India is the largest producer.",
          "Also grown in the Philippines, Thailand, and Kenya.",
          "In India it is widely cultivated in Tamil Nadu, Andhra Pradesh, and Karnataka."
        ]
      },
      {
        title: "Available Forms",
        items: ["Powder", "Capsules", "Tea", "Oil", "Fresh leaves", "Drumstick pods"]
      }
    ]
  },
  {
    id: "flaxseed",
    badge: "Everyday Essential",
    name: "Flax Seeds",
    price: "Fiber and omega-3 rich",
    image: flaxseedImage,
    marketplace: {
      amazon: "https://www.amazon.in/s?k=ssdda+farm+flax+seeds",
      flipkart: "https://www.flipkart.com/search?q=ssdda+farm+flax+seeds"
    },
    teaser:
      "Tiny, nutrient-dense seeds rich in omega-3 fatty acids, lignans, fiber, and protein.",
    intro:
      "Flax seeds come from Linum usitatissimum, one of the oldest cultivated crops in the world. They are small, oval seeds available in brown and golden varieties with a mild nutty flavor.",
    facts: [
      "Calories: around 55 per tablespoon",
      "Protein: around 1.8 g",
      "Fat: around 4.3 g",
      "Omega-3 ALA: around 2.3 g",
      "Fiber: around 2.7 g",
      "Magnesium: around 40 mg",
      "Iron: around 0.6 mg"
    ],
    types: [
      "Brown flax seeds with a stronger flavor, often used in baking.",
      "Golden flax seeds with a milder taste, often used in cereals and smoothies."
    ],
    health: [
      "Supports heart health and circulation with omega-3 ALA.",
      "Improves digestion and supports gut health with fiber.",
      "Supports brain function, mood, and memory.",
      "Contains lignans that may help protect against some cancers.",
      "May help regulate blood glucose levels.",
      "Supports skin hydration and hair strength."
    ],
    usage: [
      "Ground flax seeds in smoothies, oatmeal, yogurt, and salads.",
      "Flax seed water soaked overnight for digestive support.",
      "Flaxseed oil for low-heat uses.",
      "Recommended intake is 1-2 tablespoons per day."
    ],
    storage: [
      "Store whole seeds in an airtight container in a cool, dark place.",
      "Refrigerate ground flax seeds.",
      "Whole seeds keep for 6-12 months.",
      "Ground seeds keep for 1-3 months."
    ],
    caution:
      "People who are pregnant, have hormone-sensitive conditions, or take blood-thinning medication should be careful.",
    summary:
      "Flax seeds are among the most nutritious seeds available, valued for omega-3s, fiber, antioxidants, and protein.",
    extraSections: [
      {
        title: "Ayurveda Note",
        items: [
          "Traditionally considered warming.",
          "Used for digestive support.",
          "Sometimes used in poultices for skin inflammation."
        ]
      }
    ]
  }
];

const socialLinks = [
  {
    title: "Facebook",
    label: "@SSDDAFARM",
    href: "https://www.facebook.com/SSDDAFARM?rdid=peuY8mzBxlZ2V5Tk#",
    icon: "facebook"
  },
  {
    title: "Instagram",
    label: "@ssddafarm",
    href: "https://instagram.com/ssddafarm?igsh=MW8xYnE3Y3Z4ODJ1MA==",
    icon: "instagram"
  },
  {
    title: "WhatsApp Channel",
    label: "Follow SSDDA FARM",
    href: "https://whatsapp.com/channel/0029Vb7gVhC1XquVLj55VV13",
    icon: "whatsapp"
  },
  {
    title: "YouTube",
    label: "@ssddafarm",
    href: "https://www.youtube.com/@ssddafarm",
    icon: "youtube"
  }
];

const aboutHighlights = [
  "Farm-inspired quality",
  "Carefully selected ingredients",
  "Great taste and freshness",
  "Commitment to quality and hygiene"
];

const aboutStats = [
  {
    value: "2025",
    label: "Founded with a farm-first vision"
  },
  {
    value: "3 Core Products",
    label: "Makhana, moringa powder, and flax seeds"
  },
  {
    value: "Quality Focus",
    label: "Freshness, hygiene, and trusted sourcing"
  }
];

const monetizationChannels = [
  {
    title: "Retail Orders",
    text: "Convert visitors into direct customers with ready-to-sell everyday wellness products.",
    action: "Start Retail Enquiry",
    href: "/contact"
  },
  {
    title: "Bulk & Wholesale",
    text: "Support distributors, stores, and resellers looking for consistent supply and farm-led quality.",
    action: "Request Bulk Pricing",
    href: "/contact"
  },
  {
    title: "Corporate Gifting",
    text: "Offer curated healthy gifting packs for festive campaigns, teams, and business partners.",
    action: "Plan Gift Orders",
    href: "/contact"
  }
];

const monetizationBenefits = [
  "Lead-ready contact flow",
  "Bulk order conversion support",
  "Direct brand and community channels",
  "Product storytelling for higher trust"
];

const contactItems = [
  {
    title: "Website",
    detail: "Visit our official brand destination.",
    value: "ssddafarm.com",
    href: "https://ssddafarm.com"
  },
  {
    title: "Email",
    detail: "Reach us for orders and business queries.",
    value: "ssddafarm@gmail.com",
    href: "mailto:ssddafarm@gmail.com"
  },
  {
    title: "WhatsApp",
    detail: "Message us directly for quick support.",
    value: "+91 82877 72032",
    href: "https://wa.me/918287772032"
  }
];

const googleFormUrl = import.meta.env.VITE_GOOGLE_FORM_URL || "";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  inquiryType: "Wholesale / Bulk Order",
  quantity: "",
  subject: "Sales Inquiry",
  message: ""
};

function getInitialProduct() {
  if (typeof window === "undefined") {
    return products[0].id;
  }

  const requested = new URLSearchParams(window.location.search).get("product");
  return products.some((product) => product.id === requested) ? requested : products[0].id;
}

function getCurrentPath() {
  if (typeof window === "undefined") {
    return "/";
  }

  const pathname = window.location.pathname;
  const normalizedPath =
    pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

  return ["/", "/about", "/contact", "/buy"].includes(normalizedPath) ? normalizedPath : "/";
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, options);
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const result = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    throw new Error(result?.message || "Unable to complete this request.");
  }

  return result;
}

function formatNutritionItem(item) {
  const [label, ...rest] = item.split(":");
  if (rest.length === 0) {
    return item;
  }

  return (
    <>
      <strong>{label.trim()}:</strong> {rest.join(":").trim()}
    </>
  );
}

function normalizeRatingValue(value) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    return null;
  }

  const roundedValue = Math.round(numericValue);
  return Math.min(5, Math.max(1, roundedValue));
}

function SocialIcon({ icon }) {
  const icons = {
    facebook: (
      <path d="M14.5 8.5H12.8C11.46 8.5 11 9.03 11 10.2V12H14.4L13.95 15.3H11V23H7.5V15.3H4.5V12H7.5V9.88C7.5 6.92 9.3 5.3 11.94 5.3C13.21 5.3 14.55 5.53 14.55 5.53V8.5H14.5Z" />
    ),
    instagram: (
      <>
        <rect x="5" y="5" width="14" height="14" rx="4" />
        <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16.4" cy="7.7" r="1" />
      </>
    ),
    whatsapp: (
      <>
        <path d="M12.02 4.5C7.9 4.5 4.57 7.76 4.57 11.79C4.57 13.11 4.94 14.39 5.63 15.5L4.5 19.5L8.66 18.42C9.72 19 10.86 19.3 12.02 19.3C16.14 19.3 19.47 16.03 19.47 12C19.47 7.97 16.14 4.5 12.02 4.5Z" />
        <path d="M9.48 8.82C9.7 8.33 9.93 8.32 10.12 8.31C10.27 8.31 10.45 8.31 10.62 8.31C10.79 8.31 11.05 8.37 11.27 8.63C11.49 8.89 12.08 9.47 12.08 10.65C12.08 11.83 11.25 12.97 11.14 13.13C11.03 13.29 9.63 15.49 7.43 16.39C5.61 17.13 5.24 17 4.95 16.97C4.66 16.94 4.05 16.72 3.74 15.86C3.43 15 3.43 14.31 3.49 14.2C3.55 14.09 3.71 14.01 3.89 13.92C4.07 13.83 4.31 13.7 4.49 13.54C4.67 13.38 4.86 13.18 4.99 12.96C5.12 12.74 5.05 12.56 4.96 12.4C4.87 12.24 4.16 10.52 3.87 9.83C3.58 9.14 3.31 9.24 3.11 9.23H2.56C2.38 9.23 2.08 9.3 1.82 9.56C1.56 9.82 0.83 10.5 0.83 11.88C0.83 13.26 1.84 14.6 1.98 14.78C2.12 14.96 3.99 17.8 6.86 19.04C9.73 20.28 9.73 19.87 10.75 19.78C11.77 19.69 14.04 18.46 14.5 17.18C14.96 15.9 14.96 14.8 14.83 14.58C14.7 14.36 14.36 14.22 13.82 13.95C13.28 13.68 10.65 12.39 10.16 12.22C9.67 12.05 9.31 11.96 8.95 12.49C8.59 13.02 7.55 14.22 7.23 14.58C6.91 14.94 6.59 14.99 6.05 14.72C5.51 14.45 3.77 13.88 2.34 12.62C1.23 11.63 0.47 10.41 0.15 9.87C-0.17 9.33 0.11 9.03 0.39 8.76C0.64 8.51 0.93 8.1 1.11 7.88C1.29 7.66 1.35 7.5 1.44 7.32C1.53 7.14 1.49 6.98 1.42 6.82C1.35 6.66 0.76 5.24 0.5 4.61C0.25 3.98 0 4.08 0 4.08C0 4.08 0 4.08 0 4.08C0 4.08 0 4.08 0 4.08" />
      </>
    ),
    youtube: (
      <>
        <path d="M21.4 8.2C21.18 7.39 20.54 6.75 19.73 6.53C18.25 6.12 12 6.12 12 6.12C12 6.12 5.75 6.12 4.27 6.53C3.46 6.75 2.82 7.39 2.6 8.2C2.18 9.68 2.18 12.75 2.18 12.75C2.18 12.75 2.18 15.82 2.6 17.3C2.82 18.11 3.46 18.75 4.27 18.97C5.75 19.38 12 19.38 12 19.38C12 19.38 18.25 19.38 19.73 18.97C20.54 18.75 21.18 18.11 21.4 17.3C21.82 15.82 21.82 12.75 21.82 12.75C21.82 12.75 21.82 9.68 21.4 8.2Z" />
        <path d="M10 15.8V9.7L15.27 12.75L10 15.8Z" fill="var(--surface-strong)" />
      </>
    )
  };

  return (
    <span className={`social-icon social-icon-${icon}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="currentColor">
        {icons[icon]}
      </svg>
    </span>
  );
}

function App() {
  const [selectedProduct, setSelectedProduct] = useState(getInitialProduct);
  const [formData, setFormData] = useState(initialForm);
  const [formState, setFormState] = useState({ status: "idle", message: "" });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [productFeedback, setProductFeedback] = useState([]);
  const [feedbackDraft, setFeedbackDraft] = useState({ rating: 5, message: "" });
  const [feedbackState, setFeedbackState] = useState({ status: "idle", message: "" });
  const [showAllFeedback, setShowAllFeedback] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterState, setNewsletterState] = useState({ status: "idle", message: "" });
  const currentPath = getCurrentPath();

  const activeProduct = products.find((product) => product.id === selectedProduct);
  const buyProduct = activeProduct || products[0];
  const activeFeedback = productFeedback;
  const validRatingValues = activeFeedback
    .map((item) => normalizeRatingValue(item.rating))
    .filter((value) => value !== null);
  const averageRating = validRatingValues.length
    ? (validRatingValues.reduce((sum, value) => sum + value, 0) / validRatingValues.length).toFixed(1)
    : "0.0";
  const displayedFeedback = showAllFeedback ? activeFeedback : activeFeedback.slice(0, 5);

  useEffect(() => {
    let cancelled = false;

    async function loadFeedback() {
      setFeedbackState((current) => ({ ...current, status: "loading", message: "" }));

      try {
        const result = await requestJson(
          `/api/feedback?productId=${encodeURIComponent(selectedProduct)}`
        );
        if (cancelled) {
          return;
        }

        setProductFeedback(Array.isArray(result?.feedback) ? result.feedback : []);
        setShowAllFeedback(false);
        setFeedbackState({ status: "idle", message: "" });
      } catch (error) {
        if (cancelled) {
          return;
        }

        setProductFeedback([]);
        setFeedbackState({
          status: "error",
          message: error.message || "Unable to load feedback right now."
        });
      }
    }

    loadFeedback();

    return () => {
      cancelled = true;
    };
  }, [selectedProduct]);

  async function handleSubmit(event) {
    event.preventDefault();
    setFormState({ status: "loading", message: "Sending your message..." });

    try {
      const result = await requestJson("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!result?.message) {
        throw new Error("Contact API did not return a valid response.");
      }

      setFormState({
        status: "success",
        message: result.googleFormSynced
          ? result.message
          : `${result.message} (Google Form sync pending: ${result.googleFormReason || result.googleFormStatus || "not configured"})`
      });
      setFormData(initialForm);
    } catch (error) {
      setFormState({
        status: "error",
        message: error.message || "Something went wrong."
      });
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleFeedbackSubmit(event) {
    event.preventDefault();

    const trimmedMessage = feedbackDraft.message.trim();
    if (!trimmedMessage) {
      setFeedbackState({
        status: "error",
        message: "Please add feedback before submitting."
      });
      return;
    }

    setFeedbackState({ status: "loading", message: "Submitting feedback..." });

    try {
      const result = await requestJson("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId: selectedProduct,
          rating: Number(feedbackDraft.rating),
          message: trimmedMessage
        })
      });

      const createdFeedback = result?.feedback;
      if (!createdFeedback) {
        throw new Error("Feedback API did not return a valid response.");
      }

      setProductFeedback((current) => [createdFeedback, ...current].slice(0, 20));
      setShowAllFeedback(false);
      setFeedbackDraft({ rating: 5, message: "" });
      setFeedbackState({
        status: "success",
        message: result.message || "Thank you for your feedback."
      });
    } catch (error) {
      setFeedbackState({
        status: "error",
        message: error.message || "Unable to submit feedback right now."
      });
    }
  }

  async function handleNewsletterSubmit(event) {
    event.preventDefault();
    setNewsletterState({ status: "loading", message: "Subscribing..." });

    try {
      const result = await requestJson("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: newsletterEmail })
      });

      setNewsletterEmail("");
      setNewsletterState({
        status: "success",
        message: result?.message || "Subscribed successfully."
      });
    } catch (error) {
      setNewsletterState({
        status: "error",
        message: error.message || "Unable to subscribe right now."
      });
    }
  }

  return (
    <div className="site">
      <header className="topbar">
        <div className="section-inner topbar-inner">
          <a className="brand" href="/" aria-label="SSDDA Farm home">
            <img className="brand-logo brand-logo-clean" src={ssddaLogo} alt="SSDDA Farm logo" />
          </a>

          <button
            className="nav-toggle"
            aria-expanded={isMobileMenuOpen}
            aria-controls="main-nav"
            aria-label="Toggle menu"
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav
            id="main-nav"
            className={isMobileMenuOpen ? "nav-links nav-links-open" : "nav-links"}
          >
            <a
              className={currentPath === "/" ? "is-active" : ""}
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </a>
            <a href="/#products" onClick={() => setIsMobileMenuOpen(false)}>
              Products
            </a>
            <a
              className={currentPath === "/about" ? "is-active" : ""}
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </a>
            <a
              className={currentPath === "/contact" ? "is-active" : ""}
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
            <a className="nav-button" href="/buy?product=makhana" onClick={() => setIsMobileMenuOpen(false)}>
              Shop Now
            </a>
          </nav>
        </div>
      </header>

      <main>
        {currentPath === "/" ? (
          <>
            <section className="hero section section-hero" id="home">
              <div className="section-inner hero-grid">
                <div className="hero-copy">
                  <span className="eyebrow">Farm Fresh Since 2025</span>
                  <h1>
                    Bring Home
                    <span> Pure Farm Goodness</span>
                  </h1>
                  <p>
                    SSDDA Farm delivers fresh dry fruits, nourishing foods, and wholesome snacks
                    made with care, quality, and honest farm values.
                  </p>

                  <div className="hero-actions">
                    <a className="primary-button" href="/#products">
                      Explore Products
                    </a>
                  </div>

                  <div className="mini-benefits">
                    {benefits.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>

                  <div className="hero-metrics">
                    {aboutStats.map((item) => (
                      <article key={item.value}>
                        <strong>{item.value}</strong>
                        <span>{item.label}</span>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="hero-visual">
                  <div className="hero-card">
                    <img
                      src={heroFarm}
                      alt="Illustration of SSDDA Farm products on a display table"
                    />
                    <div className="rating-card">
                      <strong>Pure taste, trusted quality</strong>
                      <span>Fresh snacks made with care</span>
                    </div>
                    <div className="floating-card floating-card-top">
                      <strong>Business-ready quality</strong>
                      <span>Modern processing with traditional values</span>
                    </div>
                    <div className="floating-card floating-card-bottom">
                      <strong>Healthy living focus</strong>
                      <span>Wholesome products for everyday routines</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="overview-strip">
              <div className="section-inner overview-grid">
                {businessPoints.map((item) => (
                  <article key={item.title} className="overview-card">
                    <span className="overview-line" />
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="section home-social-section">
              <div className="section-inner home-social-strip">
                <div className="home-social-copy">
                  <span className="eyebrow">Join Our Community</span>
                  <h2>Follow SSDDA Farm online</h2>
                </div>
                <div className="home-social-links">
                  {socialLinks.map((item) => (
                    <a
                      key={item.title}
                      className="home-social-link"
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <SocialIcon icon={item.icon} />
                      <span className="home-social-text">
                        <strong>{item.title}</strong>
                        <small>{item.label}</small>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </section>

            <section className="section section-soft sales-section">
              <div className="section-inner sales-layout">
                <div className="sales-copy">
                  <span className="eyebrow">Monetization Ready</span>
                  <h2>Built to generate enquiries, repeat buyers, and business deals.</h2>
                  <p>
                    SSDDA Farm can monetize through direct retail sales, wholesale supply,
                    corporate gifting, and distributor partnerships. The site now supports those
                    journeys with clearer calls to action and a more sales-friendly contact flow.
                  </p>

                  <div className="sales-benefits">
                    {monetizationBenefits.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>

                <div className="sales-grid">
                  {monetizationChannels.map((item) => (
                    <article key={item.title} className="sales-card">
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                      <a className="secondary-button sales-button" href={item.href}>
                        {item.action}
                      </a>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="products section section-white" id="products">
              <div className="section-inner">
                <div className="section-heading center">
                  <span className="eyebrow">Collection</span>
                  <h2>Our Products</h2>
                  <p>
                    Browse our curated range of farm-inspired foods designed for daily wellness,
                    nourishment, and honest flavor.
                  </p>
                </div>

                <div className="product-tabs" role="tablist" aria-label="SSDDA Farm products">
                  {products.map((product) => (
                    <button
                      key={product.id}
                      className={selectedProduct === product.id ? "tab-button active" : "tab-button"}
                      onClick={() => setSelectedProduct(product.id)}
                      type="button"
                    >
                      {product.name}
                    </button>
                  ))}
                </div>

                <div className="product-grid">
                  {products.map((product) => (
                    <article key={product.id} className="product-card">
                      <span className="product-badge">{product.badge}</span>
                      <img src={product.image} alt={product.name} />
                      <div className="product-body">
                        <div className="product-head">
                          <h3>{product.name}</h3>
                          <span>{product.price}</span>
                        </div>
                        <p>{product.teaser}</p>
                        <div className="product-card-actions">
                          <button
                            className="primary-button small"
                            type="button"
                            onClick={() => {
                              setSelectedProduct(product.id);
                              document.getElementById("details")?.scrollIntoView({
                                behavior: "smooth"
                              });
                            }}
                          >
                            View Details
                          </button>
                          <a className="secondary-button small" href={`/buy?product=${product.id}`}>
                            Buy Options
                          </a>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="details section section-tint" id="details">
              <div className="section-inner detail-layout">
                <article className="detail-copy">
                  <span className="eyebrow">Product Spotlight</span>
                  <h2>{activeProduct.name}</h2>
                  <p>{activeProduct.intro}</p>

                  <div className="detail-card">
                    <h3>Basic Information</h3>
                    <ul>
                      {activeProduct.facts.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {activeProduct.process ? (
                    <div className="detail-card">
                      <h3>How It Is Produced</h3>
                      <ul>
                        {activeProduct.process.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {activeProduct.vitamins ? (
                    <div className="detail-card">
                      <h3>Vitamins</h3>
                      <ul className="chip-list">
                        {activeProduct.vitamins.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {activeProduct.compounds ? (
                    <div className="detail-card">
                      <h3>Important Compounds</h3>
                      <ul className="chip-list">
                        {activeProduct.compounds.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {activeProduct.types ? (
                    <div className="detail-card">
                      <h3>Types</h3>
                      <ul>
                        {activeProduct.types.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {activeProduct.usage ? (
                    <div className="detail-card">
                      <h3>How To Use</h3>
                      <ul>
                        {activeProduct.usage.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {activeProduct.extraSections
                    ? activeProduct.extraSections.map((section) => (
                        <div key={section.title} className="detail-card">
                          <h3>{section.title}</h3>
                          <ul>
                            {section.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))
                    : null}

                  <div className="detail-card feedback-card">
                    <h3>Product Feedback & Rating</h3>
                    <p className="feedback-summary">
                      Customer rating: <strong>{averageRating}</strong> / 5.
                    </p>
                    <form className="feedback-form" onSubmit={handleFeedbackSubmit}>
                      <label>
                        Rating
                        <select
                          value={String(feedbackDraft.rating)}
                          onChange={(event) =>
                            setFeedbackDraft((current) => ({
                              ...current,
                              rating: normalizeRatingValue(event.target.value) || 5
                            }))
                          }
                        >
                          <option value="5">5 - Excellent</option>
                          <option value="4">4 - Very Good</option>
                          <option value="3">3 - Good</option>
                          <option value="2">2 - Fair</option>
                          <option value="1">1 - Poor</option>
                        </select>
                      </label>
                      <label>
                        Feedback
                        <textarea
                          rows="4"
                          placeholder="Share your experience with this product."
                          value={feedbackDraft.message}
                          onChange={(event) =>
                            setFeedbackDraft((current) => ({
                              ...current,
                              message: event.target.value
                            }))
                          }
                        />
                      </label>
                      <button
                        className="primary-button small"
                        type="submit"
                        disabled={feedbackState.status === "loading"}
                      >
                        {feedbackState.status === "loading" ? "Submitting..." : "Submit Feedback"}
                      </button>
                    </form>
                    {feedbackState.message ? (
                      <p
                        className={
                          feedbackState.status === "error"
                            ? "form-message error"
                            : "form-message success"
                        }
                      >
                        {feedbackState.message}
                      </p>
                    ) : null}
                    {activeFeedback.length ? (
                      <>
                        <ul className="feedback-list">
                          {displayedFeedback.map((entry) => {
                            const entryRating = normalizeRatingValue(entry.rating);
                            return (
                              <li key={`${entry.timestamp}-${entry.message}`}>
                                <strong>{entryRating !== null ? `${entryRating}/5` : "No rating"}</strong>
                                <span>{entry.message}</span>
                              </li>
                            );
                          })}
                        </ul>
                        {activeFeedback.length > 5 ? (
                          <button
                            className="secondary-button small"
                            type="button"
                            onClick={() => setShowAllFeedback((current) => !current)}
                          >
                            {showAllFeedback ? "Show Less" : "Show More"}
                          </button>
                        ) : null}
                      </>
                    ) : (
                      <p className="feedback-empty">No feedback yet for this product.</p>
                    )}
                  </div>
                </article>

                <aside className="detail-sidebar">
                  <article className="detail-image-card">
                    <img src={activeProduct.image} alt={activeProduct.name} />
                  </article>

                  <article className="detail-card">
                    <h3>Buy This Product</h3>
                    <div className="buy-links">
                      <a
                        className="primary-button small"
                        href={activeProduct.marketplace.amazon}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Buy on Amazon
                      </a>
                      <a
                        className="secondary-button small"
                        href={activeProduct.marketplace.flipkart}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Buy on Flipkart
                      </a>
                    </div>
                  </article>

                  <article className="detail-card">
                    <h3>Nutritional Value</h3>
                    <ul>
                      {(activeProduct.nutrition || activeProduct.facts).map((item) => (
                        <li key={item}>{formatNutritionItem(item)}</li>
                      ))}
                    </ul>
                  </article>

                  <article className="detail-card">
                    <h3>Health Benefits</h3>
                    <ul>
                      {activeProduct.health.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>

                  {activeProduct.grades ? (
                    <article className="detail-card">
                      <h3>Common Grades</h3>
                      <ul className="chip-list">
                        {activeProduct.grades.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </article>
                  ) : null}

                  {activeProduct.storage ? (
                    <article className="detail-card">
                      <h3>Storage</h3>
                      <ul>
                        {activeProduct.storage.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </article>
                  ) : null}

                  {activeProduct.dosage ? (
                    <article className="detail-card">
                      <h3>Recommended Dosage</h3>
                      <p>{activeProduct.dosage}</p>
                    </article>
                  ) : null}

                  {activeProduct.caution ? (
                    <article className="detail-card accent">
                      <h3>Care Notes</h3>
                      <p>{activeProduct.caution}</p>
                    </article>
                  ) : null}

                  {activeProduct.summary ? (
                    <article className="detail-card">
                      <h3>Summary</h3>
                      <p>{activeProduct.summary}</p>
                    </article>
                  ) : null}
                </aside>
              </div>
            </section>
          </>
        ) : null}

        {currentPath === "/about" ? (
          <>
            <section className="section page-hero section-soft">
              <div className="section-inner page-hero-grid">
                <div className="page-copy">
                  <span className="eyebrow">About SSDDA Farm</span>
                  <h1>Rooted in purity, shaped for modern food trust.</h1>
                  <p>
                    SSDDA Farm was founded in 2025 with one clear mission: to bring farm-fresh
                    quality and delicious dry fruits, food, and snacks to every home.
                  </p>
                </div>
                <div className="page-hero-card">
                  <img src={heroFarm} alt="SSDDA Farm brand illustration" />
                </div>
              </div>
            </section>

            <section className="section section-white">
              <div className="section-inner about">
                <div className="about-visuals">
                  <article className="media-card media-card-large about-primary-media">
                    <img src={makhanaImage} alt="Illustration of a bowl of makhana" />
                  </article>
                  <div className="about-visual-column">
                    <article className="media-card media-card-small">
                      <img src={moringaImage} alt="Illustration of moringa powder and leaves" />
                    </article>
                    <article className="about-quality-card">
                      <span className="eyebrow">From Field To Plate</span>
                      <h3>Natural food, clean sourcing, and dependable quality.</h3>
                      <p>
                        We combine traditional farming values with modern food processing so every
                        SSDDA Farm product feels trustworthy, fresh, and business-ready.
                      </p>
                    </article>
                  </div>
                </div>

                <div className="about-copy">
                  <span className="eyebrow">Welcome to SSDDA Farm</span>
                  <h2>Good food starts with honest farming.</h2>
                  <p className="about-lead">
                    Welcome to SSDDA Farm founded in 2025, where purity and quality are our
                    hallmarks. We believe good food starts with fresh, natural ingredients and
                    honest farming.
                  </p>

                  <div className="about-story-grid">
                    <p>
                      SSDDA Farm combines traditional farming values with modern food processing to
                      create products that are tasty, nutritious, and trustworthy. We focus on
                      quality at every step, from the field to your plate.
                    </p>
                    <p>
                      Our team works passionately to ensure every product reflects purity,
                      freshness, and great taste. We select the best ingredients and follow safe
                      food practices so families can enjoy our products with confidence.
                    </p>
                  </div>

                  <div className="about-stat-grid">
                    {aboutStats.map((item) => (
                      <article key={item.value} className="about-stat">
                        <strong>{item.value}</strong>
                        <span>{item.label}</span>
                      </article>
                    ))}
                  </div>

                  <div className="feature-grid">
                    <article className="feature-card">
                      <h3>Our Vision</h3>
                      <p>
                        To become a trusted dry fruits, food, and snacks brand known for
                        farm-fresh quality, authentic taste, and a commitment to healthy living.
                      </p>
                    </article>
                    <article className="feature-card">
                      <h3>Our Mission</h3>
                      <p>
                        To bring farm-quality food to every home by creating snacks that are
                        delicious, nutritious, and made with care.
                      </p>
                    </article>
                  </div>

                  <div className="about-bottom-row">
                    <div className="why-card">
                      <h3>Why Choose SSDDA Farm</h3>
                      <p className="why-card-intro">
                        At SSDDA Farm, we believe food should be simple, natural, and full of
                        flavor. We are proud to bring you products that are fresh from the farm
                        and delicious in every bite.
                      </p>
                      <ul className="why-list">
                        {aboutHighlights.map((item) => (
                          <li key={item} className="why-list-item">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="about-note">
                      <strong>More than a food brand</strong>
                      <p>
                        We are building a community that supports farmers, promotes natural
                        produce, and delivers wholesome dry fruits, foods, and snacks that
                        families love.
                      </p>
                    </div>
                  </div>

                  <div className="social-panel about-social-panel">
                    <div className="social-panel-head">
                      <span className="eyebrow">Social Links</span>
                      <h3>Connect with SSDDA Farm</h3>
                    </div>

                    <div className="social-links-grid">
                      {socialLinks.map((item) => (
                        <a
                          key={item.title}
                          className={item.href === "#" ? "social-link disabled" : "social-link"}
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                        >
                          <SocialIcon icon={item.icon} />
                          <span>{item.title}</span>
                          <strong>{item.label}</strong>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : null}

        {currentPath === "/buy" ? (
          <>
            <section className="section page-hero section-soft">
              <div className="section-inner page-hero-grid">
                <div className="page-copy">
                  <span className="eyebrow">Buy Products</span>
                  <h1>Choose your product and buy from trusted marketplaces.</h1>
                  <p>
                    SSDDA FARM products are available via Amazon and Flipkart. Select a product
                    below to continue to the marketplace.
                  </p>
                </div>
                <div className="page-hero-card">
                  <img src={buyProduct.image} alt={buyProduct.name} />
                </div>
              </div>
            </section>

            <section className="section section-white">
              <div className="section-inner buy-section">
                <div className="product-tabs" role="tablist" aria-label="Choose product to buy">
                  {products.map((product) => (
                    <a
                      key={product.id}
                      className={selectedProduct === product.id ? "tab-button active" : "tab-button"}
                      href={`/buy?product=${product.id}`}
                    >
                      {product.name}
                    </a>
                  ))}
                </div>

                <article className="detail-card buy-card">
                  <h2>{buyProduct.name}</h2>
                  <p>{buyProduct.teaser}</p>
                  <div className="buy-links">
                    <a
                      className="primary-button"
                      href={buyProduct.marketplace.amazon}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Buy on Amazon
                    </a>
                    <a
                      className="secondary-button"
                      href={buyProduct.marketplace.flipkart}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Buy on Flipkart
                    </a>
                  </div>
                </article>
              </div>
            </section>
          </>
        ) : null}

        {currentPath === "/contact" ? (
          <>
            <section className="section page-hero section-soft">
              <div className="section-inner page-hero-grid">
                <div className="page-copy">
                  <span className="eyebrow">Contact SSDDA Farm</span>
                  <h1>Let’s connect for orders, partnerships, and brand enquiries.</h1>
                  <p>
                    Reach SSDDA Farm through our website, email, or WhatsApp. You can also use
                    the form below and our team will get back to you soon.
                  </p>
                </div>
                <div className="page-hero-card">
                  <img src={flaxseedImage} alt="SSDDA Farm contact page illustration" />
                </div>
              </div>
            </section>

            <section className="section section-contact">
              <div className="section-inner contact">
                <div className="contact-copy">
                  <span className="eyebrow">Contact Channels</span>
                  <h2>Talk to the SSDDA Farm team</h2>
                  <p>
                    We’re available for product questions, business communication, and direct
                    updates through the channels below.
                  </p>

                  <div className="contact-list">
                    {contactItems.map((item) => (
                      <article key={item.title} className="contact-item">
                        <h3>{item.title}</h3>
                        <p>{item.detail}</p>
                        <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined}>
                          <strong>{item.value}</strong>
                        </a>
                      </article>
                    ))}
                  </div>

                  {googleFormUrl ? (
                    <a className="secondary-button contact-google-form" href={googleFormUrl} target="_blank" rel="noreferrer">
                      Open Google Form
                    </a>
                  ) : null}
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-grid">
                    <label>
                      First Name
                      <input
                        name="firstName"
                        onChange={handleChange}
                        placeholder="John"
                        required
                        value={formData.firstName}
                      />
                    </label>
                    <label>
                      Last Name
                      <input
                        name="lastName"
                        onChange={handleChange}
                        placeholder="Doe"
                        required
                        value={formData.lastName}
                      />
                    </label>
                  </div>

                  <div className="form-grid">
                    <label>
                      Company / Store Name
                      <input
                        name="company"
                        onChange={handleChange}
                        placeholder="SSDDA Farm Partner"
                        value={formData.company}
                      />
                    </label>
                    <label>
                      Inquiry Type
                      <select name="inquiryType" onChange={handleChange} value={formData.inquiryType}>
                        <option>Wholesale / Bulk Order</option>
                        <option>Retail Purchase</option>
                        <option>Corporate Gifting</option>
                        <option>Distributor Partnership</option>
                        <option>General Inquiry</option>
                      </select>
                    </label>
                  </div>

                  <label>
                    Email
                    <input
                      name="email"
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      type="email"
                      value={formData.email}
                    />
                  </label>

                  <label>
                    Quantity / Requirement
                    <input
                      name="quantity"
                      onChange={handleChange}
                      placeholder="Example: 100 packs / monthly supply"
                      value={formData.quantity}
                    />
                  </label>

                  <label>
                    Subject
                    <input
                      name="subject"
                      onChange={handleChange}
                      placeholder="General Inquiry"
                      required
                      value={formData.subject}
                    />
                  </label>

                  <label>
                    Message
                    <textarea
                      name="message"
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      required
                      rows="5"
                      value={formData.message}
                    />
                  </label>

                  <button
                    className="primary-button submit-button"
                    disabled={formState.status === "loading"}
                    type="submit"
                  >
                    {formState.status === "loading" ? "Sending..." : "Send Message"}
                  </button>

                  <p className="contact-note">
                    Best for: wholesale, distribution, gifting, repeat supply, and retail
                    purchase enquiries.
                  </p>

                  {formState.message ? (
                    <p
                      className={
                        formState.status === "error"
                          ? "form-message error"
                          : "form-message success"
                      }
                    >
                      {formState.message}
                    </p>
                  ) : null}
                </form>
              </div>
            </section>
          </>
        ) : null}
      </main>

      <footer className="footer">
        <div className="section-inner footer-grid">
          <div className="footer-brand">
            <a className="brand inverse" href="/">
              <img className="brand-logo brand-logo-footer" src={ssddaLogo} alt="SSDDA Farm logo" />
            </a>
            <p>
              We bring wholesome dry fruits, foods, and snacks from honest sourcing to your
              table with care, freshness, and flavor.
            </p>
            <div className="footer-socials">
              {socialLinks.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className={item.href === "#" ? "footer-social disabled" : "footer-social"}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-column">
            <h3>Quick Links</h3>
            <a href="/">Home</a>
            <a href="/#products">Products</a>
            <a href="/buy?product=makhana">Buy Now</a>
            <a href="/about">About Us</a>
            <a href="/contact">Contact</a>
          </div>

          <div className="footer-column">
            <h3>Product Focus</h3>
            <a href="/buy?product=makhana">
              Makhana
            </a>
            <a href="/buy?product=moringa">
              Moringa Powder
            </a>
            <a href="/buy?product=flaxseed">
              Flax Seeds
            </a>
          </div>

          <div className="footer-column">
            <h3>Newsletter</h3>
            <p>Subscribe to hear about fresh arrivals, offers, and wholesome farm updates.</p>
            <form className="newsletter-box" onSubmit={handleNewsletterSubmit}>
              <input
                placeholder="Enter your email"
                type="email"
                required
                value={newsletterEmail}
                onChange={(event) => setNewsletterEmail(event.target.value)}
              />
              <button type="submit" disabled={newsletterState.status === "loading"}>
                {newsletterState.status === "loading" ? "Joining..." : "Join"}
              </button>
            </form>
            {newsletterState.message ? (
              <p
                className={
                  newsletterState.status === "error" ? "form-message error" : "form-message success"
                }
              >
                {newsletterState.message}
              </p>
            ) : null}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
