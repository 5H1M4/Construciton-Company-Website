require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
const app = express();
const PORT = process.env.PORT || 5000;

// Log directory and API key information
console.log("Current directory:", __dirname);
console.log("API Key first few chars:", process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY.substring(0, 5) + '...' : 'Not loaded');

// Ensure the API key is loaded
if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_API_KEY.startsWith('SG.')) {
  console.error('SendGrid API Key is invalid or not loaded. Check your environment variables.');
  process.exit(1);
}
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields (name, email, message) are required.' });
  }

  const msg = {
    to: 'shimaendi@gmail.com',
    from: 'dailydrivejaguar@gmail.com',
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    const errorDetails = {
      message: error.message,
      responseStatus: error.response ? error.response.statusCode : 'N/A',
      responseBody: error.response ? JSON.stringify(error.response.body) : 'N/A',
      stack: error.stack
    };
    return res.status(500).json({ error: 'Failed to send email', details: errorDetails });
  }
});

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
