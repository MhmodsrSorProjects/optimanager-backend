const Patient = require('../models/Patient');
const User = require('../models/User');

// Create a new patient
// Assuming you have the user's ID in the request, perhaps from a session or token

// Create a new patient
const createPatient = async (req, res) => {
  const { patientName, doctorName, phoneNumber, dateOfBirth, language, kupatCholim, gender, email, userId } = req.body;

  try {
    const newPatient = new Patient({
      patientName,
      doctorName,
      phoneNumber,
      dateOfBirth,
      language,
      kupatCholim,
      gender,
      email
    });

    // Save the new patient
    const savedPatient = await newPatient.save();

    // Add patient ID to the clinic admin's patient list
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.patients.push(savedPatient._id);
    await user.save();

    res.status(201).json(savedPatient);
  } catch (error) {
    console.error("Error creating new patient: ", error);
    res.status(500).json({ error: error.message });
  }
};

// Get patients for a clinic admin
const getPatients = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('patients');
    res.status(200).json(user.patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createExaminations = async (req, res) => {
  const { patientId } = req.params;
  const examinationData = req.body;
  console.log(examinationData);
  console.log(patientId);


  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    patient.eyeExaminations.push(examinationData);
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    console.error("Error adding examination: ", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createPatient, getPatients, createExaminations };
