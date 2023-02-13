require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const router = require('./src/server');
app.use('/api', router);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server Started at PORT ${PORT}`);
});