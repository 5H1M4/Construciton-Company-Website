const path = require('path');
const fs = require('fs');

// Set the path to the .env file correctly, assuming it's placed at the root level
const dotenvPath = path.join(__dirname, '..', '.env');
console.log("Checking if .env file exists at:", dotenvPath);

try {
  const envContent = fs.readFileSync(dotenvPath, 'utf8');
  console.log("Reading .env file content:\n", envContent);
} catch (error) {
  console.error("Error reading .env file:", error);
}

require("dotenv").config({ path: dotenvPath });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");
const app = express();
const PORT = process.env.PORT || 5000;

console.log("Current directory:", __dirname);
console.log("API Key first few chars:", process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY.substring(0, 5) + '...' : 'Not loaded');

if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_API_KEY.startsWith('SG.')) {
  console.error('SendGrid API Key is invalid or not loaded. Check your .env file.');
  process.exit(1);
}
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  console.log('[SERVER] POST /send-email hit');
  console.log('[SERVER] Request Body:', req.body);

  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    console.warn('[SERVER] Validation failed. Missing fields:', { name, email, message });
    return res.status(400).json({ error: 'All fields (name, email, message) are required.' });
  }
  console.log('[SERVER] Validation passed');

  const msg = {
    to: 'shimaendi@gmail.com',
    from: 'dailydrivejaguar@gmail.com',
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };
  console.log('[SERVER] Sending email with details:', msg);

  try {
    await sgMail.send(msg);
    console.log('[SERVER] Email sent successfully:', JSON.stringify(msg));
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('[SERVER] Error sending email:', error.message);

    if (error.response) {
      console.error('[SERVER] SendGrid Error Response Status:', error.response.statusCode);
      console.error('[SERVER] SendGrid Error Response Headers:', error.response.headers);
      console.error('[SERVER] SendGrid Error Response Body:', error.response.body);
    } else {
      console.error('[SERVER] Non-SendGrid Error:', error);
    }

    const errorDetails = {
      message: error.message,
      responseStatus: error.response ? error.response.statusCode : 'N/A',
      responseBody: error.response ? JSON.stringify(error.response.body) : 'N/A',
      stack: error.stack
    };
    console.error('[SERVER] Full error details:', JSON.stringify(errorDetails));

    res.status(500).json({
      error: 'Failed to send email',
      details: errorDetails
    });
  }
});

app.get('/', (req, res) => {
  console.log('[SERVER] Health check hit');
  res.send('Server is up and running!');
});

app.listen(PORT, () => {
  console.log(`[SERVER] Server is running on http://localhost:${PORT}`);
});
