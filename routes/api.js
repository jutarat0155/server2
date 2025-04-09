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
    const logData = req.body;

    const response = await fetch('https://app-tracking.pockethost.io/api/collections/drone_logs/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 20250301efx'
      },
      body: JSON.stringify({
        drone_id: String(logData.drone_id),
        drone_name: logData.drone_name,
        country: logData.country,
        celsius: logData.celsius
      })
    });

    const postLog = await response.json();

    if (response.ok) {
      return res.status(200).json({
        status: 'success',
        data: postLog
      });
    } else {
      return res.status(response.status).json({
        status: 'failed',
        message: postLog.message || `Failed to create log (Status: ${response.status})`
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 'failed',
      message: `Server error: ${error.message}`
    });
  }
});

module.exports = router;
