const express = require("express");
const router = express.Router();
const {
  createSwap,
  getSwapsByUser,
  updateSwapStatus
} = require("../controllers/swapController");

router.post("/", createSwap);
router.get("/:userId", getSwapsByUser);
router.patch("/:id", updateSwapStatus);

module.exports = router;
