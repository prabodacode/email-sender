const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send", async (req, res) => {
  const { title, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: "9150c2001@smtp-brevo.com", // replace with your Brevo login email
      pass: "DwjC8S9EkLJNrsxn",                      // replace with your generated SMTP key
    },
  });

  const mailOptions = {
    from: '"Your Name" <your_email@yourdomain.com>', // Brevo allows custom domain if verified
    to: "recipient@example.com",                     // replace with recipient email
    subject: title,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
