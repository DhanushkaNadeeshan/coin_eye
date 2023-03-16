require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { ethers } = require("ethers");

const { getProvider } = require("./util/wallet");

const { connectToDb } = require("./config/database");
const { onBlockCallback } = require("./util/listen");

const provider = getProvider();

// const { getAllWalletAddress } = require("./controllers/account");

// connect to database
connectToDb();

const { usecaseViewAllETH } = require("./use-cases/account");

global.onlineUsers = {};

const PORT = process.env.PORT || 5000;

const app = express();

const http = require("http").Server(app);

global.socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(cors());

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

// call api
const api = require("./routes");
app.use("/api", api);

// socket handling
global.socketIO.on("connection", (socket) => {
  const walletAddress = socket.handshake.query.address;

  console.log(`⚡: ${socket.id} user just connected!`);

  if (walletAddress) {
    global.onlineUsers[walletAddress] = socket.id;
  }

  socket.on("disconnect", (rs) => {
  
    const sid = socket.id;

    for (let key in global.onlineUsers) {
      if (global.onlineUsers[key] === sid) {
        delete global.onlineUsers[key];
        break;
      }
    }

    console.log("disconnect", sid);
  });

  socket.on("message", (message) => {
    console.log(`Received message: ${message}`);

    // socketIO.emit("message", message);
  });
});

// app.get("/ping/:id", (req, res) => {

//   let user = onlineUsers['dmdn.nadeeshan@gmail.com']
//   socketIO.to(user).emit("message", "{data:pong}");
//   res.send("send message");
// });

// create Wallte object
global.walletList = [];

// get all wallets address for listen to event
usecaseViewAllETH().then((list) => {
  for (data of list) {
    global.walletList.push(data.wallet_address);
  }
});

// TODO: uncomment this
provider.on("block", (blockNumber) => {
  onBlockCallback(ethers, provider, blockNumber);
});

app.get("*", (req, res) => {
  res.send("Unauthrized");
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
