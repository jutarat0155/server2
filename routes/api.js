const express = require('express');
const router = express.Router();

const {
  getDroneConfig,
  getDroneStatus
} = require('../services/droneConfig');

const {
  getDroneLogs,
  createDroneLog
} = require('../services/droneLogs');

// GET /configs/:droneId
router.get('/configs/:droneId', async (req, res) => {
  const droneId = req.params.droneId;
  try {
    const config = await getDroneConfig(droneId);
    if (!config) return res.status(404).json({ error: 'Drone not found' });
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /status/:droneId
router.get('/status/:droneId', async (req, res) => {
  const droneId = req.params.droneId;
  try {
    const status = await getDroneStatus(droneId);
    if (!status) return res.status(404).json({ error: 'Drone not found' });
    res.json(status);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /logs/:droneId
router.get('/logs/:droneId', async (req, res) => {
  const droneId = req.params.droneId;
  try {
    const logs = await getDroneLogs(droneId);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /logs
router.post('/logs', async (req, res) => {
  try {
    const newLog = await createDroneLog(req.body);
    res.status(201).json(newLog);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create log' });
  }
});

module.exports = router;
