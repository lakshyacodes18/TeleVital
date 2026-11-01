const { Server } = require("socket.io");
const socketAuth = require("./socketAuth");

let io;

const connectedUsers = new Map();

function initializeSocket(server) {

    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    });

    io.use(socketAuth);

    io.on("connection", (socket) => {

        const userId = socket.user._id.toString();

        connectedUsers.set(userId, socket.id);

        console.log(
            `User ${socket.user.name} connected with socket ${socket.id}`
        );

        socket.on("disconnect", () => {
            connectedUsers.delete(userId);

            console.log(
              `User ${socket.user.name} disconnected`
            );
        });
    });
}

function getIO() {

    if (!io) {
        throw new Error("Socket.IO not initialized");
    }
    return io;
}

function getUserSocket(userId) {
    return connectedUsers.get(userId.toString());
}

module.exports = {
    initializeSocket,
    getIO,
    getUserSocket
};