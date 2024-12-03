const express = require("express");
const authController = require("../controllers/authController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", authController.register); // Public
router.post("/login", authController.login); // Public

router.get("/admin", protect, adminOnly, (req, res) => {
  res.status(200).json({ message: "Welcome Admin!" });
});

module.exports = router;
