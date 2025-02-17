"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.ContentModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const ObjectId = mongoose_1.default.Types.ObjectId;
mongoose_1.default.connect("mongodb+srv://harsehrawat:VGV4e7QDzTVzwiYt@cluster0.lgwkk.mongodb.net/second-brain");
const UserSchema = new mongoose_2.Schema({
    username: { type: String, unique: true },
    password: String
});
const ContentSchema = new mongoose_2.Schema({
    title: String,
    link: String,
    type: String,
    tags: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: 'user'
        }],
    userId: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: 'user',
            require: true
        }]
});
const LinkSchema = new mongoose_2.Schema({
    hash: String,
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'user', required: true, unique: true }
});
exports.UserModel = (0, mongoose_2.model)("user", UserSchema);
exports.ContentModel = (0, mongoose_2.model)("content", ContentSchema);
exports.LinkModel = (0, mongoose_2.model)("link", LinkSchema);
