const axios = require('axios');
const CONFIG_URL = process.env.CONFIG_URL;

async function getDroneConfig(droneId) {
  const response = await axios.get(CONFIG_URL);
  const drone = response.data.data.find(d => d.drone_id == droneId);

  if (!drone) return null;

  const { drone_id, drone_name, light, country, weight } = drone;
  return { drone_id, drone_name, light, country, weight };
}

async function getDroneStatus(droneId) {
  const response = await axios.get(CONFIG_URL);
  const drone = response.data.data.find(d => d.drone_id == droneId);

  if (!drone) return null;

  return { condition: drone.condition };
}

module.exports = {
  getDroneConfig,
  getDroneStatus
};
