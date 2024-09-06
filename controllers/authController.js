const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register new user
const registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    // const newUser = new User({ username, password: hashedPassword, role });
    const newUser = new User({ username, password, role });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password);

  try {
    const user = await User.findOne({ username });
    console.log(user);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = password === user.password

    console.log(isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    console.log(user);

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };
