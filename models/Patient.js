const mongoose = require('mongoose');

const eyeExaminationSchema = new mongoose.Schema({
  dateOfEyeExamination: { type: Date, required: true },
  sphRightEye: String,
  sphLeftEye: String,
  cylRightEye: String,
  cylLeftEye: String,
  axRightEye: String,
  axLeftEye: String,
  pd: String,
  prRightEye: String,
  prLeftEye: String,
  add: String,
  koter: String,
  segment: String,
  glassesType: String
});

const patientSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  doctorName: String,
  phoneNumber: String,
  dateOfBirth: Date,
  language: String,
  kupatCholim: String,
  gender: String,
  email: { type: String, required: true, unique: true },
  eyeExaminations: [eyeExaminationSchema]
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
