const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function socketAuth(socket, next) {
    try {

        const cookieHeader = socket.handshake.headers.cookie;

        if (!cookieHeader) {
            return next(new Error("Unauthorized"));
        }

        const cookies = Object.fromEntries(
            cookieHeader.split(";").map(cookie => {
                const [key, value] = cookie.trim().split("=");
                return [key, value];
            })
        );

        const token = cookies.token;

        if (!token) {
            return next(new Error("Unauthorized"));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return next(new Error("Unauthorized"));
        }

        socket.user = user;

        next();

    } catch (err) {
        next(new Error("Unauthorized"));
    }
}

module.exports = socketAuth;