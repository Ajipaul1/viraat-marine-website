const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse urlencoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Log request details
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Handle form submissions for both Contact Us and Career Applications
app.post('/contact', (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  
  console.log('==================================================');
  console.log('📩 NEW FORM SUBMISSION RECEIVED:');
  console.log(`👤 Name:    ${name}`);
  console.log(`📧 Email:   ${email}`);
  console.log(`📞 Phone:   ${phone || 'N/A'}`);
  console.log(`📋 Subject: ${subject || 'N/A'}`);
  console.log(`💬 Message: ${message}`);
  console.log('==================================================');
  
  // Return a premium, responsive success page styled in alignment with Viraat Marine's dark theme
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Submission Received | Viraat Marine</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css">
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
      <style>
        body {
          background-color: #0c192c;
          color: #ffffff;
          font-family: 'Roboto', sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0;
        }
        .success-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 40px;
          text-align: center;
          max-width: 520px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
        }
        .success-icon {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: rgba(0, 209, 178, 0.15);
          color: #00d1b2;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          margin: 0 auto 20px auto;
        }
        h2 { font-weight: 700; margin-bottom: 15px; }
        p { color: #a0aec0; font-weight: 300; line-height: 1.6; margin-bottom: 30px; }
        .details-box {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          padding: 15px;
          text-align: left;
          font-size: 14px;
          color: #cbd5e0;
          margin-bottom: 25px;
        }
        .btn-back {
          background-color: #00d1b2;
          color: #0c192c;
          font-weight: 600;
          border: none;
          padding: 12px 32px;
          border-radius: 30px;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }
        .btn-back:hover {
          background-color: #00bfa5;
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(0, 209, 178, 0.4);
          color: #0c192c;
        }
      </style>
    </head>
    <body>
      <div class="success-card">
        <div class="success-icon">✓</div>
        <h2>Submission Received!</h2>
        <p>Thank you <strong>${name || 'Applicant'}</strong>. Your form submission has been captured on the local Viraat Marine server console.</p>
        
        <div class="details-box">
          <div><strong>Subject:</strong> ${subject || 'General Inquiry'}</div>
          <div><strong>Email:</strong> ${email || 'N/A'}</div>
        </div>

        <div>
          <a href="javascript:history.back()" class="btn-back">Go Back to Site</a>
        </div>
      </div>
    </body>
    </html>
  `);
});

// Custom Clean URL Router for Pages (handles /about, /services, /career, /career/slug, etc.)
app.use((req, res, next) => {
  if (req.method !== 'GET') return next();
  
  let reqPath = req.path;
  if (reqPath.endsWith('/') && reqPath.length > 1) {
    reqPath = reqPath.slice(0, -1);
  }
  
  if (reqPath === '/' || reqPath === '') {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
  
  // Check if corresponding .html file exists in public/
  const possibleHtmlFile = path.join(__dirname, 'public', reqPath + '.html');
  if (fs.existsSync(possibleHtmlFile) && fs.statSync(possibleHtmlFile).isFile()) {
    return res.sendFile(possibleHtmlFile);
  }
  
  next();
});

// Serve static assets (CSS, JS, Images, Fonts)
app.use(express.static(path.join(__dirname, 'public')));

// Fallback 404 handler
app.use((req, res) => {
  res.status(404).send(`
    <div style="font-family: sans-serif; text-align: center; padding: 50px; background: #0c192c; color: white; min-height: 100vh;">
      <h1>404 - Page Not Found</h1>
      <p>The page <code>${req.path}</code> was not found in the cloned website.</p>
      <a href="/" style="color: #00d1b2;">Return to Homepage</a>
    </div>
  `);
});

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(` VIRAAT MARINE LOCAL SERVER IS LIVE!`);
  console.log(` Web App URL: http://localhost:${PORT}`);
  console.log(`==================================================`);
});
