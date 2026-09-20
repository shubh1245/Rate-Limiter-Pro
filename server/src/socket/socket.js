let io;

const initSocket = (server) => {
  const socketIo = require("socket.io");

  io = socketIo(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(
      "Client Connected:",
      socket.id
    );

    socket.on(
      "disconnect",
      () => {
        console.log(
          "Client Disconnected:",
          socket.id
        );
      }
    );
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error(
      "Socket.IO not initialized"
    );
  }

  return io;
};

module.exports = {
  initSocket,
  getIO,
};