const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDb = require("./config/connectDb");
const router = require("./routes/index");
const {app, server} = require("./socket/index")
// const app = express();


app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

// Api endpoints

app.use("/api", router);

connectDb().then(() => {
  server.listen(PORT, () => {
    console.log("server is running on " + PORT);
  });
});
