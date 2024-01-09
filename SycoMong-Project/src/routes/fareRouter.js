const express = require('express');
const router = express.Router();
const fareController = require('../controllers/fareController');

router.post("/", fareController.create);

module.exports = router;