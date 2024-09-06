const express = require('express');
const {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    createUser,
    getUserPatients  // Import createUser controller function
} = require('../controllers/userController');

const router = express.Router();

// Routes for managing users
router.get('/', getAllUsers);         // Get all users
router.get('/:id', getUserById);      // Get a single user by ID
router.put('/:id', updateUser);       // Update a user by ID
router.delete('/:id', deleteUser);    // Delete a user by ID
router.post('/', createUser);         // Create a new user (admin of clinic)
router.get('/:userId/patients', getUserPatients);

module.exports = router;
