const express = require("express");
const cors = require("cors");
const allRoutes = require("./routes");
const loggerMiddleware = require("./middlewares/logger");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static("public"));
app.use("/", loggerMiddleware, allRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App is listening on the port ${PORT} ...`);
});
