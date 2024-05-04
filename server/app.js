const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const taskRoute = require("./routes/taskRoute");
const authRoute = require("./routes/authRoute");
const methodNotAllowed = require("./utils/methodNotAllowed");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const PORT = `${process.env.PORT}`;
const MONGO_URL = `${process.env.MONGO_URI}`;

// middlewares & routes
app.use(cors());
app.use(express.json());
app.use("/task", taskRoute);
app.use("/auth", authRoute);
app.use(errorHandler);
app.use(methodNotAllowed);

const connect = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB!");
    app.listen(PORT, () => {
      console.log(`app is now listening on PORT: ${PORT}`);
    });
  } catch (error) {
    console.log("Couldnt connect to DB because ....");
    console.log(error);
  }
};

connect();
