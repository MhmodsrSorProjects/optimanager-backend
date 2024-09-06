const express = require('express');
const { createPatient, getPatients, createExaminations } = require('../controllers/patientController');

const router = express.Router();

router.post('/patients', createPatient);
router.get('/patients', getPatients);
router.post('/patients/:patientId/examinations', createExaminations);
module.exports = router;
