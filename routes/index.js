const express = require("express");
const router = express.Router();

const lessonRotes = require("../routes/lessons");
const ordersRoutes = require("../routes/orders");
const searchRoutes = require("../routes/search");

router.get("/", (req, res) => {
  res.send("Lessons API");
});
router.use("/lessons", lessonRotes);
router.use("/orders", ordersRoutes);
router.use("/search", searchRoutes);

module.exports = router;
