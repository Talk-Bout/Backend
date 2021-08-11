"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Http_exception_1 = __importDefault(require("./Http.exception"));
class UserCreationException extends Http_exception_1.default {
    constructor() {
        super(404, '잘못된 경로: 주소(URL)를 확인해주세요.');
    }
}
exports.default = UserCreationException;
