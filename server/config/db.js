// DB config for New-Project-Odoo-Hackathon-
const sqlite3 = require("sqlite3").verbose();
let db;

function initDB() {
  db = new sqlite3.Database("../server/database.db", (err) => {
    if (err) {
      console.error("DB Error:", err.message);
    } else {
      console.log("Connected to New-Project-Odoo-Hackathon- SQLite database.");

      // Create users table
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          email TEXT,
          availability TEXT,
          isPublic INTEGER,
          location TEXT,
          profilePhoto TEXT
        )
      `);

      // ✅ Create swaps table
      db.run(`
        CREATE TABLE IF NOT EXISTS swaps (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          requesterId INTEGER,
          receiverId INTEGER,
          skillOffered TEXT,
          skillWanted TEXT,
          message TEXT,
          status TEXT DEFAULT 'pending',
          FOREIGN KEY (requesterId) REFERENCES users(id),
          FOREIGN KEY (receiverId) REFERENCES users(id)
        )
      `, (err) => {
        if (err) console.error("Swaps table creation failed:", err.message);
        else console.log("✅ swaps table created!");
      });
    }
  });
}


function getDB() {
  return db;
}

module.exports = { initDB, getDB };
