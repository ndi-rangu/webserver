const express = require('express');
const router = express.Router();
const resetPasswordController = require('../controllers/resetPasswordController');

router.put("/:id", resetPasswordController.update);

module.exports = router;