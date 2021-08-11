"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
require("dotenv/config");
exports.default = (password) => {
    const HASH_KEY = process.env.HASH_KEY;
    return crypto_1.default.createHmac('sha256', password).update(HASH_KEY).digest('hex');
};
