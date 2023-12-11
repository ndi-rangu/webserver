// Register route
const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerControlller');

router.post("/", registerController.create);
router.get("/",registerController.getAll);
router.get("/:id", registerController.getById);
router.get("/search", registerController.getById);

module.exports = router;