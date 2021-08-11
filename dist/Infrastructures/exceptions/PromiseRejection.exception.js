"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Http_exception_1 = __importDefault(require("./Http.exception"));
class UserCreationException extends Http_exception_1.default {
    constructor() {
        super(500, '프로미스 에러: 원인이 불분명한 오류입니다.');
        // 대부분은 DB 내 데이터 충돌(이미 가입한 회원 등) 혹은 네트워크 불안이 원인임.
    }
}
exports.default = UserCreationException;
