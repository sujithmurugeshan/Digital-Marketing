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
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
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

    // Send confirmation email to user
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

    res.status(200).json({ 
      success: true, 
      message: 'Your message has been sent successfully. We will contact you shortly!' 
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while processing your request. Please try again.' 
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
  console.log(`📱 WhatsApp: ${twilioClient ? process.env.RECIPIENT_WHATSAPP_NUMBER : 'Not configured'}`);
  console.log('\n⚠️  Important: Update .env file with your Gmail App Password and Twilio credentials');
});
