const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

db.run(`ALTER TABLE users ADD COLUMN location TEXT`, (err) => {
  if (err && !err.message.includes("duplicate")) {
    console.error("Error updating table:", err.message);
  } else {
    console.log("✅ 'location' column added to users table!");
  }
  db.close();
});
