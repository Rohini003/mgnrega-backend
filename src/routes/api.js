const express = require('express');
const router = express.Router();
const Wage = require('../models/Wage');

// Get all wages
router.get('/wages', async (req, res) => {
  try {
    const wages = await Wage.find();
    res.json(wages);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching wages', error: err });
  }
});

// Test route
router.get('/', (req, res) => {
  res.json({ message: 'API is working fine!' });
});

module.exports = router;
