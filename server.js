const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname)));

app.post('/submit', async (req, res) => {
  const { name, phone, email } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false,
    auth: {
      user: 'user@example.com',
      pass: 'password'
    }
  });

  const message = {
    from: 'user@example.com',
    to: 'clinic@example.com',
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}`
  };

  try {
    await transporter.sendMail(message);
    res.status(200).send('OK');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
