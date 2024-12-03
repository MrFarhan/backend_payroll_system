// /src/routes/userRoutes.js
const express = require("express");
const userController = require("../controllers/userController");
const attendanceController = require("../controllers/attendanceController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/change-password", protect, userController.changePassword);

router.post("/attendance/checkin", protect, attendanceController.checkin);
router.post("/attendance/checkout", protect, attendanceController.checkout);
router.get("/attendance", protect, attendanceController.viewAttendance);

module.exports = router;
