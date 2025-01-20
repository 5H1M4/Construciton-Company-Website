const path = require('path');
require("dotenv").config({ path: path.join(__dirname, '.env') });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

const app = express();
const PORT = process.env.PORT || 5000;

// Set API key after verifying it exists
if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_API_KEY.startsWith("SG.")) {
  console.error("SendGrid API Key is invalid or not loaded. Check your environment variables.");
  // Don't exit in production
  if (process.env.NODE_ENV !== 'production') {
    process.exit(1);
  }
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Configure CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://ballo-shpk-construciton.vercel.app'] // Update domain
    : 'http://localhost:5173'
}));

app.use(bodyParser.json());

// Route to send email
app.post("/api/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields (name, email, message) are required." });
  }

  const msg = {
    to: "shimaendi@gmail.com",
    from: "dailydrivejaguar@gmail.com",
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent: ${JSON.stringify(msg)}`);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    if (error.response) {
      console.error("SendGrid Error Response:", error.response.body);
    }
    res.status(500).json({ error: "Email failed to send" });
  }
});

// Health check route
app.get("/api", (req, res) => {
  res.json({ status: "Server is up and running!" });
});

// Only start the server if not running on Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
