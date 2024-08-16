const mongoose = require("mongoose");
const { DB_URL } = require("./server.config");

async function connectToDB() {
  try {
    await mongoose.connect(DB_URL);
    console.log("connected to db", DB_URL);
  } catch (error) {
    console.log("unable to connect to the DB", error);
  }
}

module.exports = connectToDB;
