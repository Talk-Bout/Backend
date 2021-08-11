"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../../Infrastructures/utils/prisma");
const Authentication_exception_1 = __importDefault(require("../exceptions/Authentication.exception"));
require("dotenv/config");
const WhoAreYou_exception_1 = __importDefault(require("../exceptions/WhoAreYou.exception"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || '').split(' ');
    if (!authToken || authType !== 'Bearer') {
        return next(new Authentication_exception_1.default());
    }
    const User = prisma_1.prisma.user;
    const HASH_KEY = process.env.HASH_KEY;
    const jwtWhy = jsonwebtoken_1.default.verify(authToken, HASH_KEY);
    const user = yield User.findUnique({
        where: { nickname: Object.values(jwtWhy)[0] }
    }).catch(() => next(new Authentication_exception_1.default()));
    if ((req.originalUrl != '/tokenUser') && ((user === null || user === void 0 ? void 0 : user.nickname) != req.body.nickname)) {
        next(new WhoAreYou_exception_1.default());
    }
    res.locals.userInfo = user;
    next();
});
