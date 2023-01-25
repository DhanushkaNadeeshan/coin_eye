const mongoose = require("mongoose");
const MongoDB_URL = process.env.DB_URL;
const connectToDb = () => {
  mongoose.set("strictQuery", false);
  // Connect to the MongoDB database
  mongoose.connect(MongoDB_URL, {
    useNewUrlParser: true,
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
