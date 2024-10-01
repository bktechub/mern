const express = require('express');
const Attendance = require('../models/Attendance');

const router = express.Router();

// POST: Save multiple attendance records
router.post('/', async (req, res) => {
  try {
    const attendanceData = req.body; // Expecting an array of attendance records

    // Validate attendance data (add your own validation logic if needed)
    if (!Array.isArray(attendanceData)) {
      return res.status(400).json({ message: 'Invalid attendance data format' });
    }

    const attendanceRecords = await Attendance.insertMany(attendanceData);
    
    res.status(201).json(attendanceRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save attendance data' });
  }
});

// GET: Retrieve all attendance records (optional)
router.get('/', async (req, res) => {
  try {
    const records = await Attendance.find().populate('youthId'); // Populate youthId for better data
    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve attendance records' });
  }
});

// GET: Retrieve attendance records by userId
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from route parameters
    const records = await Attendance.find({ userId }).populate('youthId'); // Populate youthId for better data

    if (records.length === 0) {
      return res.status(404).json({ message: 'No attendance records found for this user' });
    }

    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve attendance records by userId' });
  }
});

// GET: Retrieve attendance records by compassion
router.get('/compassion/:compassion', async (req, res) => {
  try {
    const { compassion } = req.params; // Get compassionId from route parameters
    const records = await Attendance.find({ compassion: compassion }).populate('youthId'); // Populate youthId for better data

    if (records.length === 0) {
      return res.status(404).json({ message: 'No attendance records found for this compassion' });
    }

    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve attendance records by compassion' });
  }
});

module.exports = router;
