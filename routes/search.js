const express = require("express");
const mongoClient = require("../mongo-connect");

const router = express.Router();


router.post("/", async (req, res) => {
  const db = await mongoClient();
  const search = req.body.search;

  //   let items = await db
  //     .collection("lessons")
  //     .find({ subject: { $regex: "Ar", $options: "i" } })
  //     .toArray();

  //   let items = await db
  //     .collection("lessons")
  //     .find({ subject: { $regex: search, $options: "i" } })
  //     .toArray();

  let items = await db
    .collection("lessons")
    .find({
      $or: [
        { subject: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ],
    })
    .toArray();

  res.send(
    items.map((item) => {
      return { id: item._id, ...item };
    })
  );

});

module.exports = router;
