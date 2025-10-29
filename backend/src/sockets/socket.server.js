const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

function initializeSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.use(async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

    if (!cookies.accessToken)
      next(new Error("Authentication error: No token provieded"));

    try {
      const decoded = jwt.verify(cookies.accessToken, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded.id);
      socket.user = user;
      next();
    } catch (err) {
      next(new Error("Authentication error: Invalid token"));
    }
    // console.log("Socket connection cookies", cookies);
  });

  io.on("connection", (socket) => {
    console.log("new socket connection", socket.id);
  });
}

module.exports = initializeSocketServer;
