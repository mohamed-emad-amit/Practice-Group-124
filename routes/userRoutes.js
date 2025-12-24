// Import
const express = require("express");

// Import Controller
const userController = require("../controllers/userControllers");

// Create Router
const router = express.Router();

// CRUD
router.get("", userController.findAll);
router.get("/:id", userController.findOne);

router.post("", userController.createUser);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.removeUser);

// Export
module.exports = router;
