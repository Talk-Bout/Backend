"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_middleware_1 = __importDefault(require("../../Infrastructures/middlewares/validation.middleware"));
const createUser_validator_1 = __importDefault(require("../validators/createUser.validator"));
const readEmail_validator_1 = __importDefault(require("../validators/readEmail.validator"));
const readNickname_validator_1 = __importDefault(require("../validators/readNickname.validator"));
const nickname_validator_1 = __importDefault(require("../validators/nickname.validator"));
const ValidationFailure_exception_1 = __importDefault(require("../../Infrastructures/exceptions/ValidationFailure.exception"));
const PromiseRejection_exception_1 = __importDefault(require("../../Infrastructures/exceptions/PromiseRejection.exception"));
const user_create_1 = __importDefault(require("../services/user.create"));
const email_read_1 = __importDefault(require("../services/email.read"));
const nickname_read_1 = __importDefault(require("../services/nickname.read"));
const myPosts_read_1 = __importDefault(require("../services/myPosts.read"));
const myBookmark_read_1 = __importDefault(require("../services/myBookmark.read"));
const user_update_1 = __importDefault(require("../services/user.update"));
const user_delete_1 = __importDefault(require("../services/user.delete"));
const bcrypy_1 = require("../../Infrastructures/utils/bcrypy");
class UsersController {
    constructor() {
        this.path = '/users';
        this.router = express_1.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .route(this.path)
            .post(validation_middleware_1.default(createUser_validator_1.default), this.createUser);
        this.router
            .route(this.path + '/email/:email')
            .get(validation_middleware_1.default(readEmail_validator_1.default), this.readEmailExist);
        this.router
            .route(this.path + '/nickname/:nickname')
            .get(validation_middleware_1.default(readNickname_validator_1.default), this.readNicknameExist)
            .patch(validation_middleware_1.default(nickname_validator_1.default), this.updateUser)
            .delete(validation_middleware_1.default(nickname_validator_1.default), this.deleteUser);
        this.router
            .route(this.path + '/:nickname/posts')
            .get(validation_middleware_1.default(nickname_validator_1.default), this.getMyPosts);
        this.router
            .route(this.path + '/nickname/:bookmark')
            .get(validation_middleware_1.default(nickname_validator_1.default), this.getMyBookmark);
    }
    createUser(req, res, next) {
        const createDTO = {
            nickname: req.body.nickname,
            email: req.body.email,
            password: bcrypy_1.generateHash(req.body.password)
        };
        if (req.body.password != req.body.confirmPassword) {
            next(new ValidationFailure_exception_1.default());
        }
        return user_create_1.default(createDTO)
            .then(() => res.status(201).json({ isCreated: true }))
            .catch((err) => {
            console.error(err);
            next(new PromiseRejection_exception_1.default());
        });
    }
    readEmailExist(req, res, next) {
        const readEmailDTO = {
            email: req.body.email
        };
        return email_read_1.default(readEmailDTO)
            .then((exist) => res.status(200).json({ isExist: exist ? true : false }))
            .catch((err) => {
            console.error(err);
            next(new PromiseRejection_exception_1.default());
        });
    }
    readNicknameExist(req, res, next) {
        const readNicknameDTO = {
            nickname: req.body.nickname
        };
        return nickname_read_1.default(readNicknameDTO)
            .then((exist) => res.status(200).json({ isExist: exist ? true : false }))
            .catch((err) => {
            console.error(err);
            next(new PromiseRejection_exception_1.default());
        });
    }
    updateUser(req, res, next) {
        const updateUserDTO = {
            nickname: req.body.nickname,
            password: req.body.password,
            email: req.body.email
        };
        user_update_1.default(updateUserDTO)
            .then((result) => res.status(200).json({ isUpdated: result ? true : false }))
            .catch((err) => {
            console.error(err);
            next(new PromiseRejection_exception_1.default());
        });
    }
    deleteUser(req, res, next) {
        const deleteUserDTO = { nickname: req.body.nickname };
        user_delete_1.default(deleteUserDTO)
            .then((result) => res.status(200).json({ isDeleted: result ? true : false }))
            .catch((err) => {
            console.error(err);
            next(new PromiseRejection_exception_1.default());
        });
    }
    getMyPosts(req, res, next) {
        const myPostDTO = {
            nickname: req.body.nickname
        };
        return myPosts_read_1.default(myPostDTO)
            .then((posts) => res.status(200).json(posts))
            .catch((err) => {
            console.error(err);
            next(new PromiseRejection_exception_1.default());
        });
    }
    getMyBookmark(req, res, next) {
        const myBookmarkDTO = {
            nickname: req.body.nickname
        };
        return myBookmark_read_1.default(myBookmarkDTO)
            .then((posts) => res.status(200).json(posts))
            .catch((err) => {
            console.error(err);
            next(new PromiseRejection_exception_1.default());
        });
    }
}
exports.default = UsersController;
