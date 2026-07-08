import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const emailLogin = process.env.EMAIL_LOGIN || process.env.EMAIL_USER;
const emailFrom = process.env.EMAIL_FROM || process.env.EMAIL_USER;
const emailTo = process.env.EMAIL_TO || process.env.EMAIL_USER;
const allowedOrigins = (process.env.ALLOWED_ORIGINS || [
  'http://localhost:3001',
  'http://127.0.0.1:3001',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
].join(','))
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const contactAttempts = new Map();
const CONTACT_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const CONTACT_RATE_LIMIT_MAX = 5;

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function cleanText(value = '', maxLength = 500) {
  return String(value).replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, maxLength);
}

function isValidEmail(value = '') {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getEmailConfigError() {
  if (!emailFrom) return 'Missing EMAIL_USER or EMAIL_FROM in .env.';
  if (!emailTo) return 'Missing EMAIL_USER or EMAIL_TO in .env.';
  if (!emailLogin) return 'Missing EMAIL_LOGIN in .env.';
  if (!process.env.EMAIL_PASSWORD) return 'Missing EMAIL_PASSWORD in .env.';
  return null;
}

function getMailFailureMessage(error) {
  const details = `${error?.code || ''} ${error?.responseCode || ''} ${error?.response || ''} ${error?.message || ''}`.toLowerCase();

  if (error?.code === 'EAUTH' || error?.responseCode === 535 || details.includes('authentication')) {
    return 'Email authentication failed. Please check the Brevo SMTP login and key.';
  }

  if (details.includes('sender') || details.includes('from')) {
    return 'Email sender is not accepted by Brevo. Verify EMAIL_FROM/EMAIL_USER as a Brevo sender.';
  }

  if (details.includes('self-signed certificate') || details.includes('certificate chain')) {
    return 'SMTP TLS certificate check failed. Set EMAIL_TLS_REJECT_UNAUTHORIZED=false locally or install the trusted network certificate.';
  }

  if (error?.code === 'ECONNECTION' || error?.code === 'ETIMEDOUT' || error?.code === 'ESOCKET') {
    return 'Could not connect to the email server. Please check the SMTP host, port, and network.';
  }

  return 'Email delivery failed. Please check the backend logs for the SMTP error.';
}

function contactRateLimit(req, res, next) {
  const key = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const attempt = contactAttempts.get(key) || { count: 0, resetAt: now + CONTACT_RATE_LIMIT_WINDOW_MS };

  if (now > attempt.resetAt) {
    attempt.count = 0;
    attempt.resetAt = now + CONTACT_RATE_LIMIT_WINDOW_MS;
  }

  attempt.count += 1;
  contactAttempts.set(key, attempt);

  if (attempt.count > CONTACT_RATE_LIMIT_MAX) {
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again later.',
    });
  }

  next();
}

// Middleware
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json({ limit: '20kb' }));

// API status for backend-only deployment.
app.get('/', (req, res) => {
  res.json({
    status: 'Akshu Medias API is running',
    contactEndpoint: '/api/contact',
  });
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
    rejectUnauthorized: process.env.EMAIL_TLS_REJECT_UNAUTHORIZED !== 'false',
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
app.post('/api/contact', contactRateLimit, async (req, res) => {
  const name = cleanText(req.body.name, 120);
  const email = cleanText(req.body.email, 254);
  const phone = cleanText(req.body.phone, 40);
  const industry = cleanText(req.body.industry, 120);
  const message = cleanText(req.body.message, 2000);

  // Validate input
  if (!name || !email || !phone || !industry || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required.' 
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a valid email address.',
    });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeIndustry = escapeHtml(industry);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');
  const safeContactEmail = escapeHtml(emailTo || emailFrom || '');

  try {
    const emailConfigError = getEmailConfigError();
    if (emailConfigError) {
      return res.status(500).json({
        success: false,
        message: emailConfigError,
      });
    }

    // Send Email
    await emailTransporter.sendMail({
      from: emailFrom,
      to: emailTo,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      disableFileAccess: true,
      disableUrlAccess: true,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>Industry:</strong> ${safeIndustry}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
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
          body: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nIndustry: ${industry}\n\nMessage: ${message}`,
        });
      } catch (whatsappError) {
        console.log('WhatsApp notification failed:', whatsappError.message);
      }
    }

    // Send confirmation email to user. Do not fail the lead if this optional
    // autoresponder is rejected by the recipient's server.
    try {
      await emailTransporter.sendMail({
        from: emailFrom,
        to: email,
        subject: 'Thanks for reaching out to Akshu Medias',
        disableFileAccess: true,
        disableUrlAccess: true,
        html: `
          <h2>Hello ${safeName},</h2>
          <p>Thank you for getting in touch with Akshu Medias! We've received your message and will get back to you shortly.</p>
          <p>In the meantime, feel free to reach us at:</p>
          <ul>
            <li>📞 Phone: +91 99946 27016</li>
            <li>📧 Email: ${safeContactEmail}</li>
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

    res.status(500).json({ 
      success: false, 
      message: getMailFailureMessage(error)
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
  console.log(`📧 Email From: ${emailFrom || 'Not configured'}`);
  console.log(`📬 Email To: ${emailTo || 'Not configured'}`);
  console.log(`🔐 SMTP Login: ${emailLogin ? 'Configured' : 'Not configured'}`);
  console.log(`📱 WhatsApp: ${twilioClient ? process.env.RECIPIENT_WHATSAPP_NUMBER : 'Not configured'}`);
  console.log('\n⚠️  Important: Update .env file with your Brevo SMTP key and Twilio credentials');
});
