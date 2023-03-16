const nodemailer = require('nodemailer');
const sendingMail = async (member_mail,subject,text) => {
    var transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            //user: process.env.EMAIL_ADDRESS,
            //pass: process.env.EMAIL_PASSWORD,
        }
    });

    var mailOptions = {
        //from: process.env.EMAIL_ADDRESS,
        to: member_mail,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return 'verify mail failed'

        } else {
            console.log('Email sent: ' + info.response);
            return 'we sent you mail';
        }
    });
}

module.exports ={
    sendingMail
};
