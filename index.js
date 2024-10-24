const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDb = require("./config/connectDb");
const router = require("./routes/index");
const {app, server} = require("./socket/index")

// Allow requests from specific origin (replace with your client URL)
const allowedOrigins = [process.env.LOCAL_HOST, process.env.FRONTEND_URL];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the methods you want to allow
  credentials: true, // Enable cookies to be sent in CORS requests if necessary
}));

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
