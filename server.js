const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = 3000; // or 80 if deploying to production

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/send", async (req, res) => {
  const { title, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtppro.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: "r.praboda@10280805.xyz", // your Zoho email
      pass: "zANkVBw55Vv1", // App-specific password from Zoho
    },
  });

  const mailOptions = {
    from: '"Website Contact" <your@10280805.xyz>',
    to: "r.praboda@10280805.xyz", // or another recipient
    subject: title,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ success: true, message: "Email sent!" });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
