const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');


router.post("/:id", vehicleController.create);

module.exports = router;