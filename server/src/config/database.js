const mongoose = require("mongoose");

const connectToDb = () => {
  mongoose.set("strictQuery", false);
  // Connect to the MongoDB database
  mongoose.connect("mongodb://127.0.0.1:27017/wallet", {
    useNewUrlParser: true
  });

  // Get the connections
  const db = mongoose.connection;

  // When the connection is open
  db.on("open", () => {
    console.log("MongoDB connection established");
  });

  // When the connection is error
  db.on("error", (err) => {
    console.log(`MongoDB connection error: ${err}`);
  });
};

module.exports = { connectToDb };
