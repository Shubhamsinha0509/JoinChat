export default function initChatSocket(io) {
  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("joinChat", (chatId) => {
      socket.join(chatId);
      console.log(`User joined chat: ${chatId}`);
    });

    socket.on("sendMessage", (message) => {
      const chatId = message.chat._id;
      io.to(chatId).emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}