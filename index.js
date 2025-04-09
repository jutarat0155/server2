const express = require('express');
const cors = require('cors')
const app = express();
require('dotenv').config();
const apiRoutes = require('./routes/api');

app.use(express.json());
app.use(cors());
app.use('/', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Drone API Server is running on port ${PORT}`);
});
