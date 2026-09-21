import { io } from "socket.io-client";

const socket = io(
  "https://rate-limiter-pro-backend.onrender.com/"
);

export default socket;