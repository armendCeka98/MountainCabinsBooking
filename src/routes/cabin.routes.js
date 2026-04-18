const express = require('express');
const router = express.Router();

const { getCabins } = require('../controllers/cabin.controller');

router.get('/', getCabins);

module.exports = router;