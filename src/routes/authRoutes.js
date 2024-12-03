// /src/routes/authRoutes.js
const express = require("express");
const authController = require("../controllers/authController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

const router = express.Router();

// Authentication routes
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
