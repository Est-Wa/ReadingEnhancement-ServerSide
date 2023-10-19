const nodemailer = require('nodemailer');
const sendingMail = async (member_mail, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: member_mail,
        subject,
        text,
    };

    console.log(mailOptions)

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error('Error sending email:', error);
            return 'verify mail failed';
        } else {
            console.log('Email sent:', info.response);
            return 'we sent you mail';
        }
    });

}

module.exports = {
    sendingMail
};