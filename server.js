const env = require('dotenv').config().parsed;
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = env.PORT;

app.use(cors({origin: '*'}));
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: env.USER,
        pass: env.PASS,
    }
})

app.post('/send-email', async(req, res) => {
    const {name, email ,message} = req.body;

    const mailOptions = {
        from: email,
        to: env.USER,
        subject: `Message from ${name}`,
        text: message,
    };

    try{
        await transporter.sendMail(mailOptions);
        res.status(200).json({message: "Email sent successfully"});
    } catch(error){
        console.error("Error sending email:", error);
        res.status(500).json({message: "Failed to send email"});
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})