const express = require("express");
const router = express.Router();
const { getPublicUsers } = require("../controllers/userController");

router.get("/", getPublicUsers);

module.exports = router;
