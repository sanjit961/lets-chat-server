const mongoose = require("mongoose");

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("connnected to db");
    });
    connection.on("error", (error) => {
      console.log("Something is wrong in mongodb", error);
    });
  } catch (error) {
    console.log("Something is wrong ", error);
  }
}

module.exports = connectDb;
