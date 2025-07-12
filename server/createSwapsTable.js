const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS swaps (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      requesterId INTEGER,
      receiverId INTEGER,
      skillOffered TEXT,
      skillWanted TEXT,
      message TEXT,
      status TEXT DEFAULT 'pending',
      FOREIGN KEY(requesterId) REFERENCES users(id),
      FOREIGN KEY(receiverId) REFERENCES users(id)
    )
  `, (err) => {
    if (err) console.error("Table creation failed:", err.message);
    else console.log("✅ swaps table created!");
    db.close();
  });
});
