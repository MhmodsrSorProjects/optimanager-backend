const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Adjust path as necessary

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Compare the provided password with the hashed password in the database
        const isMatch = password === user.password
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        // Successful login
        // Here you could create a JWT token or session
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
