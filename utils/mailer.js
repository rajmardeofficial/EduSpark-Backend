const nodemailer = require('nodemailer')

// transporter object with Gmail SMTP configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'eduspark.developement@gmail.com',
        pass: process.env.NODEMAILER_GOOGLE_PASSWORD
    }
});

// function to send an email
module.exports.sendMail = async (to, subject, text) => {
    try {
        // Send email
        await transporter.sendMail({
            from: 'Eduspark System Generated',
            to,
            subject,
            text
        });
        console.log('Email sent successfully to: ' + to);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
