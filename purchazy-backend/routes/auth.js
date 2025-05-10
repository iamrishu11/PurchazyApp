// routes/auth.js
const express = require('express');
const router = express.Router();

const otps = {}; // In-memory OTP store

router.post('/send-otp', (req, res) => {
  const { mobile } = req.body;
  if (!mobile) {
    return res.status(400).json({ success: false, message: 'Mobile number required' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  otps[mobile] = otp;
  console.log(`OTP for ${mobile}: ${otp}`);

  res.json({ success: true, message: 'OTP sent successfully' });
});

router.post('/verify-otp', (req, res) => {
  const { mobile, otp } = req.body;
  if (!mobile || !otp) {
    return res.status(400).json({ success: false, message: 'Missing mobile or OTP' });
  }

  const correctOtp = otps[mobile];
  if (correctOtp && otp == correctOtp) {
    delete otps[mobile];
    return res.json({ success: true, message: 'OTP verified' });
  }

  return res.status(401).json({ success: false, message: 'Invalid or expired OTP' });
});

module.exports = router;
