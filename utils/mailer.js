const nodemailer = require('nodemailer')

// transporter object with Gmail SMTP configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@example.com',
        pass: 'your-password'
    }
});

// function to send an email
module.exports.sendMail = async (to, subject, text) => {
    try {
        // Send email
        await transporter.sendMail({
            from: 'your-email@example.com',
            to,
            subject,
            text
        });
        console.log('Email sent successfully to: ' + to);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
