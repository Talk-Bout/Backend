"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Http_exception_1 = __importDefault(require("./Http.exception"));
class ValidationFailureException extends Http_exception_1.default {
    constructor() {
        super(400, '입력값을 확인해주세요.');
    }
}
exports.default = ValidationFailureException;
