// Import
const express = require("express");

// Import Controller
const userController = require("../controllers/userControllers");
const { uploader } = require("../utils/uploaderService");

// Create Router
const router = express.Router();

// CRUD
router.get("", userController.findAll);
router.get("/:id", userController.findOne);

// Avatar - Docs
router.post(
  "",
  // uploader.single("avatar"), request.file.path
  // uploader.array("docs", 5), request.files.map(f => f.path)
  uploader.fields([
    { name: "avatar", maxCount: 1 }, // request.files.avatar[0].path
    { name: "docs", maxCount: 5 }, // request.files.docs.map(f => f.path)
  ]),
  userController.createUser
);


router.patch('/:id', uploader.single('avatar'), userController.updateAvatar) // update avatar
router.put("/:id", userController.updateUser);

router.delete("/:id", userController.removeUser);

// Export
module.exports = router;
