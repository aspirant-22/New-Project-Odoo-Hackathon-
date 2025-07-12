const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

db.serialize(() => {
  db.run(`INSERT INTO users (name, email, availability, isPublic, location, profilePhoto) VALUES
  ('Riya', 'riya@mail.com', 'Evenings', 1, 'Delhi', 'https://passport-photo.online/images/cms/prepare_light_b364e3ec37.webp?quality=80&format=webp&width=1920'),
  ('Amit', 'amit@mail.com', 'Weekends', 1, 'Mumbai', 'https://www.shutterstock.com/image-photo/passport-photo-portrait-young-man-260nw-2437772333.jpg'),
  ('Nisha', 'nisha@mail.com', 'Mornings', 0, 'Bangalore', 'https://www.shutterstock.com/image-photo/passport-photo-portrait-woman-on-260nw-2438031869.jpg')
`, (err) => {
    if (err) console.error("Insert failed:", err.message);
    else console.log("Sample users inserted!");
    db.close();
  });
});
