import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";
import chatSocket from "./sockets/chat.socket.js";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React frontend origin
    methods: ["GET", "POST"],
    credentials: true,
  },
});

chatSocket(io);

const startServer = async () => {
  try {
    await connectToDatabase();
    server.listen(PORT, () =>
      console.log(`Server live: http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
