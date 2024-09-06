const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const emailRoutes = require('./routes/emailRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', patientRoutes);
app.use('/api/users', userRoutes);
app.use('/api/email', emailRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
