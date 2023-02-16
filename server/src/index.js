require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const { connectToDb } = require("./config/database");

// connect to database
connectToDb();

const api = require("./routes/api");


const PORT = process.env.PORT || 5000;

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cookieParser());

app.use("/api", api);

app.get("*", (req, res) => {
  res.send("Unauthrized");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
