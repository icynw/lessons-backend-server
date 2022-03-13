const mongo = require("mongodb");
// const uri = "mongodb://localhost:27017";
const uri = "mongodb+srv://Yusuf:newpassword@express-app.6mbdh.mongodb.net/lessons_app?retryWrites=true&w=majority"

module.exports = async function () {
  try {
    const client = await mongo.MongoClient.connect(uri);
    console.log("db is connected ...");

    const db = client.db("lessons_app");
    return db;
  } catch (err) {
    console.error("Error while connecting to mongodb.", err);
  }
};
