const { getDB } = require("../config/db");

function getPublicUsers(req, res) {
  const db = getDB();
  db.all("SELECT * FROM users WHERE isPublic = 1", [], (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
}

module.exports = { getPublicUsers };
