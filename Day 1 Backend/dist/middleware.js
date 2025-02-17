"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const userMiddleware = (req, res, next) => {
    const receivedToken = req.headers["authorization"];
    const decodedToken = jsonwebtoken_1.default.verify(receivedToken, config_1.JWT_SECRET_KEY);
    if (decodedToken) {
        // @ts-ignore
        req.userId = decodedToken.id;
        next();
    }
    else {
        res.status(401).json({ message: "Invalid Token" });
    }
};
exports.userMiddleware = userMiddleware;
