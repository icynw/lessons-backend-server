const express = require("express");
const mongoClient = require("../mongo-connect");

const router = express.Router();
// router.post("/", async (req, res) => {
//   const order = {};
//   req.body.order.lessons.forEach((o) => {
//     const lessonId = o.id;

//     if (order[lessonId]) {
//       order[lessonId].noOfSpaces = order[lessonId].noOfSpaces + 1;
//     } else {
//       let newOrder = o;
//       newOrder.noOfSpaces = 1;
//       order[lessonId] = newOrder;
//     }
//   });

//   const lessons = Object.values(order).map(o => {
//       return {
//         lesson_id: o.id,
//         no_of_spaces: o.noOfSpaces,
//       }
//   })

//   const newOrder = {
//       name: req.body.name;
//       phone_number: req.body.phoneNumber,
//       lessons
//   }

//   const orders = Object.values(order).map((o) => {
//     return {
//       name: o.name,
//       phone_number: o.phoneNumber,
//       lesson_id: o.id,
//       no_of_spaces: o.noOfSpaces,
//     };
//   });

//   const db = await mongoClient();
//   const savedOrders = await db.collection("orders").insertMany(orders);

//   res.send({ orders: savedOrders });
// });

router.post("/", async (req, res) => {
  const order = {};
  req.body.lessons.forEach((less) => {
    const lessonId = less;

    if (order[lessonId]) {
      order[lessonId].noOfSpaces = order[lessonId].noOfSpaces + 1;
    } else {
      let newOrder = { lessonId };
      newOrder.noOfSpaces = 1;
      order[lessonId] = newOrder;
    }
  });

  const lessons = Object.values(order).map((o) => {
    return {
      lesson_id: o.lessonId,
      no_of_spaces: o.noOfSpaces,
    };
  });

  const newOrder = {
    name: req.body.name,
    phone_number: req.body.phoneNumber,
    lessons,
  };

  const db = await mongoClient();
  const savedOrder = await db.collection("orders").insertOne(newOrder);

  res.send({ newOrder: savedOrder });
});

module.exports = router;
