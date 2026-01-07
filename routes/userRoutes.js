// Import
const express = require("express");

// Import Controller
const userController = require("../controllers/userControllers");
const { uploader } = require("../utils/uploaderService");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { roleMiddleware } = require("../middlewares/roleMiddleware");

// Create Router
const router = express.Router();

// CRUD

router.get("", userController.findAll); // api/users
router.get("/me", authMiddleware, userController.getMe); // api/users/me
router.get("/:id", userController.findOne); // api/users/1

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

router.patch("/:id", uploader.single("avatar"), userController.updateAvatar); // update avatar
router.put("/:id", userController.updateUser);

router.delete(
  "/:id",
  authMiddleware, // Get Current User
  roleMiddleware("super-admin"),
  userController.removeUser
);

// Export
module.exports = router;
