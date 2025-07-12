const { getDB } = require("../config/db");

function createSwap(req, res) {
  const { requesterId, receiverId, skillOffered, skillWanted, message } = req.body;
  const db = getDB();

  const sql = `
    INSERT INTO swaps (requesterId, receiverId, skillOffered, skillWanted, message, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(sql, [requesterId, receiverId, skillOffered, skillWanted, message, "pending"], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: this.lastID });
  });
}


function getSwapsByUser(req, res) {
  const { userId } = req.params;
  const db = getDB();
  const sql = `
    SELECT * FROM swaps
    WHERE requesterId = ? OR receiverId = ?
  `;
  db.all(sql, [userId, userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
}

function updateSwapStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  const db = getDB();
  const sql = `UPDATE swaps SET status = ? WHERE id = ?`;
  db.run(sql, [status, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
}

function deleteSwap(req, res) {
  const { id } = req.params;
  const db = require("../config/db").getDB();

  const sql = `DELETE FROM swaps WHERE id = ? AND status = 'pending'`;

  db.run(sql, [id], function (err) {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true });
  });
}


module.exports = {
  createSwap,
  getSwapsByUser,
  updateSwapStatus,
  deleteSwap
};
