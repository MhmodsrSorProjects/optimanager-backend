const User = require('../models/User');
// const bcrypt = require('bcryptjs');

// Create a new user (clinic admin)
const createUser = async (req, res) => {
    const { username, password, name, role } = req.body; // Get user details from request body

    // Check if all required fields are provided
    if (!username || !password || !name || !role) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({
            username,
            password,
            // password: hashedPassword,
            name,
            role,
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all users (for superadmin to manage clinic admins)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Exclude password
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a user's information
const updateUser = async (req, res) => {
    const { username, name, password } = req.body;
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (username) user.username = username;
        if (name) user.name = name;
        // if (password) user.password = await bcrypt.hash(password, 10);
        if (password) user.password = password;

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserPatients = async (req, res) => {
    try {
        const { userId } = req.params; // Get userId from the URL
        const userWithPatients = await User.findById(userId).populate('patients'); // Assuming 'patients' is an array of ObjectIds in User model
        if (!userWithPatients) {
            return res.status(404).send('User not found');
        }
        res.json(userWithPatients.patients); // Send only the patients array as response
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    createUser,
    getUserPatients
};
