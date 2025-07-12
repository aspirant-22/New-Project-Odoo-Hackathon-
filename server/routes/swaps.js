const express = require("express");
const router = express.Router();
const {
  createSwap,
  getSwapsByUser,
  updateSwapStatus,
  deleteSwap
} = require("../controllers/swapController");

router.post("/", createSwap);
router.patch("/:id", updateSwapStatus);
router.delete("/:id", deleteSwap);
router.get("/:userId", getSwapsByUser); 

module.exports = router;
