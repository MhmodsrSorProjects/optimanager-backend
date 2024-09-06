const transporter = require('../config/emailConfig');

const sendEmail = async (recipients, subject, message) => {
    const mailOptions = {
        from: '"mhmod" mhmod.srsor@hotmail.com', // sender address
        to: recipients,
        subject: subject,
        text: message,
        html: `<p>${message}</p>` // html body
    };
    console.log(mailOptions);
    
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        return { messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = { sendEmail };
