const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

db.serialize(() => {
  db.run(`INSERT INTO users (name, email, availability, isPublic, location) VALUES
    ('Riya', 'riya@mail.com', 'Evenings', 1, 'Delhi'),
    ('Amit', 'amit@mail.com', 'Weekends', 1, 'Mumbai'),
    ('Nisha', 'nisha@mail.com', 'Mornings', 0, 'Bangalore')
  `, (err) => {
    if (err) console.error("Insert failed:", err.message);
    else console.log("Sample users inserted!");
    db.close();
  });
});
