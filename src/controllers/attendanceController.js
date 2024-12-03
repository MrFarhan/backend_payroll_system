const db = require("../models/db");

// Check-in
exports.checkin = async (req, res) => {
  const userId = req.user.id;
  const date = new Date().toISOString().split("T")[0];

  try {
    const [rows] = await db.execute(
      "SELECT * FROM attendance WHERE user_id = ? AND date = ?",
      [userId, date],
    );

    if (rows.length > 0) {
      return res.status(400).json({ message: "Already checked in today" });
    }

    await db.execute(
      "INSERT INTO attendance (user_id, checkin_time, date) VALUES (?, ?, ?)",
      [userId, new Date().toTimeString().split(" ")[0], date],
    );

    res.status(201).json({ message: "Checked in successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error checking in", error: err.message });
  }
};

// Check-out
exports.checkout = async (req, res) => {
  const userId = req.user.id;
  const date = new Date().toISOString().split("T")[0];

  try {
    const [rows] = await db.execute(
      "SELECT * FROM attendance WHERE user_id = ? AND date = ?",
      [userId, date],
    );
    const attendance = rows[0];

    if (!attendance) {
      return res.status(400).json({ message: "Check-in required first" });
    }

    if (attendance.checkout_time) {
      return res.status(400).json({ message: "Already checked out today" });
    }

    await db.execute("UPDATE attendance SET checkout_time = ? WHERE id = ?", [
      new Date().toTimeString().split(" ")[0],
      attendance.id,
    ]);

    res.status(200).json({ message: "Checked out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error checking out", error: err.message });
  }
};

// View Attendance
exports.viewAttendance = async (req, res) => {
  const userId = req.user.id;
  const { date, month } = req.query;

  try {
    let query = "SELECT * FROM attendance WHERE user_id = ?";
    const params = [userId];

    if (date) {
      query += " AND date = ?";
      params.push(date);
    } else if (month) {
      query += " AND MONTH(date) = ?";
      params.push(month);
    }

    const [rows] = await db.execute(query, params);

    res.status(200).json(rows);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching attendance", error: err.message });
  }
};
