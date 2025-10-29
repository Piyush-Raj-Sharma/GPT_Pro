const { Server } = require("socket.io");

function initializeSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("new socket connection", socket.id);
  });
}

module.exports = initializeSocketServer;
