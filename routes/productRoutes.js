const express = require("express");
const productController = require("../controllers/productController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

// CRUD
router.get("", productController.findAll);
router.get("/:id", productController.findOne);

// Any Role Can Create A Product
router.post("", authMiddleware, productController.createProduct); // Product Related User

router.put("/:id", authMiddleware, productController.updateProduct);

router.delete("/:id", authMiddleware, productController.removeProduct);

module.exports = router;
