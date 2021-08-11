"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
require('dotenv').config();
exports.default = (nickname) => {
    return jsonwebtoken_1.default.sign({ nickname: nickname }, "JJJ"); //process.env.JWT))
};
