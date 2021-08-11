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
const express_1 = require("express");
const PromiseRejection_exception_1 = __importDefault(require("../../Infrastructures/exceptions/PromiseRejection.exception"));
const validation_middleware_1 = __importDefault(require("../../Infrastructures/middlewares/validation.middleware"));
const login_validator_1 = __importDefault(require("../validators/login.validator"));
const login_1 = __importDefault(require("../services/login"));
const loginskyler_1 = __importDefault(require("../services/loginskyler"));
const authentication_middleware_1 = __importDefault(require("../../Infrastructures/middlewares/authentication.middleware"));
const generateToken_1 = __importDefault(require("../../Infrastructures/utils/generateToken"));
const passport_1 = require("passport");
class AuthController {
    constructor() {
        this.path = '/login';
        this.path2 = '/loginSkyler2';
        this.path3 = '/auth/google';
        this.passportCallback = '/auth/google/redirect';
        this.redirect = "/a";
        this.logout = '/logout';
        this.router = express_1.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(this.path, validation_middleware_1.default(login_validator_1.default), this.login);
        this.router.post(this.path2, this.loginSkyler2);
        this.router.get(this.path3, passport_1.authenticate('google', { session: false, scope: ["profile", "email"] }));
        this.router.get(this.passportCallback, passport_1.authenticate('google', { session: false }), this.redirectPage);
        this.router.get(this.redirect, this.a); // just for checking 
        this.router.get('/tokenUser', authentication_middleware_1.default, this.tokenUser);
        this.router.get(this.logout, this.logoutUser);
    }
    logoutUser(req, res) {
        req.logout();
        res.redirect('/');
    }
    a(req, res) {
        res.send("welcome ");
    }
    redirectPage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("checking redirect from auth.controller ");
            // redriect the page after google login
            console.log(req.user);
            res.redirect(`http://localhost:3000/a?token=${req.user.token}`);
        });
    }
    loginSkyler2(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const password = req.body.password;
            console.log(email, password);
            const loginSkylerDTO = {
                email,
                password
            };
            try {
                const user = yield loginskyler_1.default(loginSkylerDTO);
                if (user) {
                    const authenticationDTO = {
                        nickname: user === null || user === void 0 ? void 0 : user.nickname,
                        email: user === null || user === void 0 ? void 0 : user.email,
                        token: generateToken_1.default(user === null || user === void 0 ? void 0 : user.nickname)
                    };
                    return res.status(200).json(authenticationDTO);
                }
                else {
                    return res.status(400).json({ login: "failed" });
                }
            }
            catch (error) {
                console.log(error, "fucker");
                res.status(500).json({ message: "아이디 혹은 비밀번호가 틀립니다." });
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginDTO = {
                email: req.body.email,
                password: req.body.password
            };
            const user = yield login_1.default(loginDTO)
                .catch((err) => {
                console.error(err);
                next(new PromiseRejection_exception_1.default());
            });
            if (user) {
                const authenticationDTO = {
                    nickname: user === null || user === void 0 ? void 0 : user.nickname,
                    email: user === null || user === void 0 ? void 0 : user.email,
                    token: generateToken_1.default(user === null || user === void 0 ? void 0 : user.nickname)
                };
                return res.status(200).json(authenticationDTO);
            }
            else {
                return res.status(400).json({ login: "failed" });
            }
        });
    }
    tokenUser(req, res, next) {
        return res.send(res.locals.userInfo.nickname);
    }
}
exports.default = AuthController;
