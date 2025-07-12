// DB config for New-Project-Odoo-Hackathon-
const sqlite3 = require("sqlite3").verbose();
let db;

function initDB() {
  db = new sqlite3.Database("./server/database.db", (err) => {
    if (err) {
      console.error("DB Error:", err.message);
    } else {
      console.log("Connected to New-Project-Odoo-Hackathon- SQLite database.");
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          email TEXT,
          availability TEXT,
          isPublic INTEGER
        )
      `);
    }
  });
}

function getDB() {
  return db;
}

module.exports = { initDB, getDB };
