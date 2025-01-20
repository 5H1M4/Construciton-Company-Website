const path = require('path');
require("dotenv").config({ path: path.join(__dirname, '.env') });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");
const app = express();
const PORT = process.env.PORT || 5000;

console.log("Current directory:", __dirname);
console.log("API Key first few chars:", process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY.substring(0, 5) + "..." : "Not loaded");

if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_API_KEY.startsWith("SG.")) {
  console.error("SendGrid API Key is invalid or not loaded. Check your .env file.");
  process.exit(1);
}
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(cors());
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
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
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    if (error.response) {
      console.error("SendGrid Error Response:", error.response.body);
    }
    res.status(500).send("Email failed to send");
  }
});

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
