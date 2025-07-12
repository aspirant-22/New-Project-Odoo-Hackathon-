const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

// Show all users
db.all("SELECT * FROM users", (err, rows) => {
  console.log("\n📋 Users:");
  if (err) console.error("Error fetching users:", err.message);
  else console.table(rows);
});

// Show all swaps
db.all("SELECT * FROM swaps", (err, rows) => {
  console.log("\n🔁 Swaps:");
  if (err) console.error("Error fetching swaps:", err.message);
  else console.table(rows);
});

db.close();
