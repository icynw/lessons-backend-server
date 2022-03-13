const express = require("express");
const { ObjectId } = require("mongodb");
const mongoClient = require("../mongo-connect");

const router = express.Router();

router.get("/", async (req, res) => {
  const db = await mongoClient();
  const lessons = await db.collection("lessons").find({}).toArray();

  res.send({
    lessons: lessons.map((less) => {
      return { id: less._id, ...less };
    }),
  });
});

router.put("/", async (req, res) => {
  const lesson = {};
  req.body.lesson.forEach((less) => {
    const lessonId = less.id;

    if (lesson[lessonId]) {
      lesson[lessonId].noOfSpaces = lesson[lessonId].noOfSpaces + 1;
    } else {
      const _lesson = {
        lessonId,
        noOfSpaces: 1,
      };
      lesson[lessonId] = _lesson;
    }
  });

  let updatedLessons = Object.values(lesson);

  const db = await mongoClient();

  const dbLessons = await db
    .collection("lessons")
    .find({
      _id: {
        $in: updatedLessons.map((less) => ObjectId(less.lessonId)),
      },
    })
    .toArray();

  const newUpdatedLessons = [];
  updatedLessons.forEach((less) => {
    const dbLesson = dbLessons.find(
      (dbLess) => dbLess._id.toString() === less.lessonId
    );

    newUpdatedLessons.push({
      lessonId: less.lessonId,
      spaces: Math.abs(less.noOfSpaces - dbLesson.space),
    });
  });

  for (let i = 0; i < newUpdatedLessons.length; ++i) {
    const currentLess = newUpdatedLessons[i];
    await db
      .collection("lessons")
      .updateOne(
        { _id: ObjectId(currentLess.lessonId) },
        { $set: { space: currentLess.spaces } }
      );
  }

  console.log("db lessons: ", dbLessons);

  res.send({ newUpdatedLessons });
});

module.exports = router;
