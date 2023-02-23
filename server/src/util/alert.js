function sendAlert(address, massage) {
  let connectionId = global.onlineUsers[address];
  if (connectionId) {
    global.socketIO.to(connectionId).emit("message", massage);
  }
}

module.exports = { sendAlert };
