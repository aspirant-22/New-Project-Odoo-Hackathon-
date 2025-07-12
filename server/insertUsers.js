const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

db.serialize(() => {
  db.run(`INSERT INTO users (name, email, availability, isPublic) VALUES
    ('Riya', 'riya@mail.com', 'Evenings', 1),
    ('Amit', 'amit@mail.com', 'Weekends', 1),
    ('Nisha', 'nisha@mail.com', 'Mornings', 0)
  `, (err) => {
    if (err) console.error("Insert failed:", err.message);
    else console.log("Sample users inserted!");
    db.close();
  });
});
