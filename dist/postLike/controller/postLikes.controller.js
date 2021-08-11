"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_middleware_1 = __importDefault(require("../../Infrastructures/middlewares/validation.middleware"));
const createPostLike_validator_1 = __importDefault(require("../validators/createPostLike.validator"));
const PromiseRejection_exception_1 = __importDefault(require("../../Infrastructures/exceptions/PromiseRejection.exception"));
const postLike_create_1 = __importDefault(require("../services/postLike.create"));
const postLike_delete_1 = __importDefault(require("../services/postLike.delete"));
class BookmarksController {
    constructor() {
        this.path = '/posts/:postId/postLike';
        this.router = express_1.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .route(this.path)
            .post(validation_middleware_1.default(createPostLike_validator_1.default), this.createPostLike);
        this.router.route(this.path + '/:postLikeId').delete(this.deletePostLike);
    }
    createPostLike(req, res, next) {
        const createDTO = {
            nickname: req.body.nickname,
            postId: req.body.postId
        };
        return postLike_create_1.default(createDTO)
            .then(() => res.status(201).json({ isCreated: true }))
            .catch((err) => {
            console.error(err);
            next(new PromiseRejection_exception_1.default());
        });
    }
    deletePostLike(req, res, next) {
        const deleteDTO = {
            postLikeId: Number(req.params.postLikeId)
        };
        return postLike_delete_1.default(deleteDTO)
            .then(() => res.status(201).json({ isDeleted: true }))
            .catch((err) => {
            console.error(err);
            next(new PromiseRejection_exception_1.default());
        });
    }
}
exports.default = BookmarksController;
