const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const cabinRoutes = require('./routes/cabin.routes');
const authRoutes = require('./routes/auth.routes');

app.use('/cabins', cabinRoutes);
app.use('/auth', authRoutes);

module.exports = app;