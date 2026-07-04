# 🚀 Akshu Medias Backend Setup Guide

## Overview
The contact form on your website now sends:
- ✅ **Email** to akshumedias@gmail.com
- ✅ **WhatsApp** notification to +91 99946 27016

## Quick Start

### 1. Start the Server
```bash
npm run dev
```
The server will run on `http://localhost:3001`

### 2. Test the Form
Open `http://localhost:3001` in your browser and test the contact form.

---

## Configuration

### 📧 Gmail Setup (Required for Emails)

1. **Enable 2-Step Verification** on your Google Account:
   - Go to [myaccount.google.com](https://myaccount.google.com)
   - Click "Security" in the left menu
   - Enable 2-Step Verification

2. **Generate App Password**:
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Windows Computer" (or your device)
   - Copy the 16-character password

3. **Update .env file**:
   ```
   EMAIL_USER=akshumedias@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
   ```

### 📱 Twilio Setup (Optional for WhatsApp)

1. **Sign up** at [twilio.com](https://twilio.com)
2. **Get a WhatsApp number**:
   - Go to Messaging → WhatsApp
   - Request a number (costs $1/month after trial)

3. **Get API Credentials**:
   - Dashboard → Account
   - Copy: Account SID & Auth Token

4. **Update .env file**:
   ```
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890
   RECIPIENT_WHATSAPP_NUMBER=whatsapp:+919994627016
   ```

---

## Files Created

- **server.js** - Express backend server with email & WhatsApp integration
- **.env** - Configuration file (keep private, don't commit to git)
- **updated index.html** - Form now submits to backend

## Environment Variables (.env)

```env
# Email (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# WhatsApp (Twilio)
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
RECIPIENT_WHATSAPP_NUMBER=whatsapp:+919994627016

# Server
PORT=3001
```

---

## How It Works

1. User fills contact form on website
2. Form submits to `/api/contact` endpoint
3. Server validates data
4. Sends **email** to akshumedias@gmail.com
5. Sends **WhatsApp** message to +91 99946 27016
6. Sends **confirmation email** to user
7. Returns success message to user

---

## Troubleshooting

### "Network error. Make sure the server is running on port 3001"
- Check if server is running: `npm run dev`
- Make sure you're accessing `http://localhost:3001` (not a different port)

### "Email not sending"
- Verify Gmail App Password is correct in .env
- Check that 2-Step Verification is enabled
- Wait a few seconds - Gmail can be slow sometimes

### "WhatsApp not sending"
- Twilio is optional - set up only if needed
- If not configured, emails will still work
- Verify phone number format: `whatsapp:+919994627016`

---

## Production Deployment

When deploying to production:

1. Use a **.env file** that's not pushed to git
2. Add to **.gitignore**:
   ```
   .env
   node_modules
   ```
3. Set environment variables in your hosting platform (Heroku, AWS, etc.)
4. Update frontend to use your production URL:
   ```javascript
   fetch('https://yourproductiondomain.com/api/contact', ...)
   ```

---

## Support

For issues or questions, contact: akshumedias@gmail.com
