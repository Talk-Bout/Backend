"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Http_exception_1 = __importDefault(require("./Http.exception"));
class WhoAreYouException extends Http_exception_1.default {
    constructor() {
        super(401, '너는 누구니?');
    }
}
exports.default = WhoAreYouException;
