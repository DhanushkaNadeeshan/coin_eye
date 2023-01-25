require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { connectToDb } = require("./config/database");

// connect to database
connectToDb();

const api = require("./routes/api");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/api", api);

app.get("*", (req, res) => {
  res.send("Unauthrized");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
