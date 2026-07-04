import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const emailLogin = process.env.EMAIL_LOGIN || process.env.EMAIL_USER;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Serve index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Email transporter configuration
const emailTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp-relay.brevo.com',
  port: Number(process.env.EMAIL_PORT || 587),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: emailLogin,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: process.env.EMAIL_TLS_REJECT_UNAUTHORIZED === 'true',
  },
});

// Twilio client configuration
let twilioClient = null;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_ACCOUNT_SID.startsWith('AC')) {
  twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
}

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Validate input
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required.' 
    });
  }

  try {
    // Send Email
    await emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Submitted from: Akshu Medias Website</small></p>
      `,
    });

    // Send WhatsApp Message (if Twilio is configured)
    if (twilioClient) {
      try {
        await twilioClient.messages.create({
          from: process.env.TWILIO_WHATSAPP_NUMBER,
          to: process.env.RECIPIENT_WHATSAPP_NUMBER,
          body: `📨 New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage: ${message}`,
        });
      } catch (whatsappError) {
        console.log('WhatsApp notification failed:', whatsappError.message);
      }
    }

    // Send confirmation email to user. Do not fail the lead if this optional
    // autoresponder is rejected by the recipient's server.
    try {
      await emailTransporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thanks for reaching out to Akshu Medias',
        html: `
          <h2>Hello ${name},</h2>
          <p>Thank you for getting in touch with Akshu Medias! We've received your message and will get back to you shortly.</p>
          <p>In the meantime, feel free to reach us at:</p>
          <ul>
            <li>📞 Phone: +91 99946 27016</li>
            <li>📧 Email: akshumedias@gmail.com</li>
          </ul>
          <p>Best regards,<br>Akshu Medias Team</p>
        `,
      });
    } catch (confirmationError) {
      console.log('Confirmation email failed:', confirmationError.message);
    }

    res.status(200).json({ 
      success: true, 
      message: 'Your message has been sent successfully. We will contact you shortly!' 
    });

  } catch (error) {
    console.error('Error processing contact form:', error);

    const isEmailAuthError = error.code === 'EAUTH' || error.responseCode === 535;

    res.status(500).json({ 
      success: false, 
      message: isEmailAuthError
        ? 'Email authentication failed. Please check the Brevo SMTP login and key.'
        : 'An error occurred while processing your request. Please try again.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`📧 Email: ${process.env.EMAIL_USER || 'Not configured'}`);
  console.log(`🔐 SMTP Login: ${emailLogin ? 'Configured' : 'Not configured'}`);
  console.log(`📱 WhatsApp: ${twilioClient ? process.env.RECIPIENT_WHATSAPP_NUMBER : 'Not configured'}`);
  console.log('\n⚠️  Important: Update .env file with your Brevo SMTP key and Twilio credentials');
});
