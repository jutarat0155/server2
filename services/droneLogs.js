const axios = require('axios');
const LOGS_URL = process.env.LOGS_URL;

async function getDroneLogs(droneId) {
  const response = await axios.get(LOGS_URL, {
    params: {
      filter: `drone_id=${droneId}`,
      sort: '-created',
      perPage: 25
    }
  });

  const items = response.data.items || [];

  return items.map(log => ({
    drone_id: log.drone_id,
    drone_name: log.drone_name,
    created: log.created,
    country: log.country,
    celsius: log.celsius
  }));
}

async function createDroneLog(data) {
  const { drone_id, drone_name, country, celsius } = data;

  const response = await axios.post(LOGS_URL, {
    drone_id,
    drone_name,
    country,
    celsius
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.data;
}

module.exports = {
  getDroneLogs,
  createDroneLog
};
