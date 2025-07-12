// Project: New-Project-Odoo-Hackathon-
// Description: Express backend for Skill Swap functionality

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { initDB } = require("./config/db");
const userRoutes = require("./routes/users");

const app = express();
app.use(cors());
app.use(bodyParser.json());

initDB(); // initialize SQLite DB
app.use("/users", userRoutes);

app.listen(3000, () => {
  console.log("New-Project-Odoo-Hackathon- server running at http://localhost:3000");
});
