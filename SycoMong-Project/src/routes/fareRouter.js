const express = require('express');
const router = express.Router();
const fareController = require('../controllers/fareController');
const auth1 = require('../middleware/authCon');

router.post("/", auth1, fareController.create);

module.exports = router;