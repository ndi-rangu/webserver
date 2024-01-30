const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const auth2 = require('../middleware/authDriv');

router.post("/", auth2, vehicleController.create);

module.exports = router;