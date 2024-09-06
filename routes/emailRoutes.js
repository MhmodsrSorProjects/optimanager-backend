const express = require('express');
const router = express.Router();
const { sendEmail } = require('../controllers/emailController');

// POST endpoint for sending emails
router.post('/send', async (req, res) => {
    try {
        const { recipients, subject, message } = req.body;
        console.log(req.body);

        const result = await sendEmail(recipients, subject, message);
        res.status(200).json({ success: true, messageId: result.messageId });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;


