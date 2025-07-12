const express = require("express");
const router = express.Router();
const {
  createSwap,
  getSwapsByUser,
  updateSwapStatus,
  deleteSwap,
  getAllSwaps 
} = require("../controllers/swapController");

router.post("/", createSwap);
router.patch("/:id", updateSwapStatus);
router.delete("/:id", deleteSwap);
router.get("/all", getAllSwaps); 
router.get("/:userId", getSwapsByUser); 


module.exports = router;
