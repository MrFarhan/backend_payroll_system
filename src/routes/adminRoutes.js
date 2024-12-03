// /src/routes/adminRoutes.js
const express = require("express");
const adminController = require("../controllers/adminController");
const userAdminController = require("../controllers/userAdminController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/users", protect, adminOnly, userAdminController.getAllUsers);
router.get("/users/:id", protect, adminOnly, userAdminController.getUserById);
router.post("/users", protect, adminOnly, userAdminController.addUser);
router.put("/users/:id", protect, adminOnly, userAdminController.updateUser);
router.delete("/users/:id", protect, adminOnly, userAdminController.deleteUser);

module.exports = router;
