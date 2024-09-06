const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['superadmin', 'clinicadmin'], required: true },
  name: { type: String, required: true },
  patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }] // Reference to an array of Patient documents
});

module.exports = mongoose.model('User', userSchema);
