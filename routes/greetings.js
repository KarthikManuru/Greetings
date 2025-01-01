const express = require('express');
const nodemailer = require('nodemailer');
const Greeting = require('../models/Greetings');

const router = express.Router();

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "karthikmanuru4@gmail.com",
    pass: "tixuadhbtewzqahm" 
  },
});

// POST: Send Greeting and Save to DB
router.post('/send', async (req, res) => {
  const { recipientEmail, greetingType, customMessage } = req.body;

  try {
    // Send email using nodemailer
    const mailOptions = {
      from: 'karthikmanuru4@gmail.com',
      to: recipientEmail,
      subject: `${greetingType} Greetings!`,
      text: customMessage,
    };

    await transporter.sendMail(mailOptions);

    // Save greeting to MongoDB
    const newGreeting = new Greeting({ recipientEmail, greetingType, customMessage });
    await newGreeting.save();

    res.status(200).json({ message: 'Greeting sent and saved successfully!' });
  } catch (error) {
    console.error('Error sending greeting:', error);
    res.status(500).json({ error: 'Failed to send greeting.' });
  }
});

module.exports = router;