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
const express_1 = __importDefault(require("express"));
const comment_read_1 = __importDefault(require("../services/comment.read"));
const comment_create_1 = __importDefault(require("../services/comment.create"));
const comment_update_1 = __importDefault(require("../services/comment.update"));
const comment_delete_1 = __importDefault(require("../services/comment.delete"));
const PromiseRejection_exception_1 = __importDefault(require("../../Infrastructures/exceptions/PromiseRejection.exception"));
const validation_middleware_1 = __importDefault(require("../../Infrastructures/middlewares/validation.middleware"));
const createComment_validator_1 = __importDefault(require("../validators/createComment.validator"));
const updateComment_validator_1 = __importDefault(require("../validators/updateComment.validator"));
const readComment_validator_1 = __importDefault(require("../validators/readComment.validator"));
class CommentsController {
    constructor() {
        this.path = '/posts/:postId/comments';
        this.idPath = '/posts/:postId/comments/:commentId';
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .route(this.idPath)
            .patch(validation_middleware_1.default(updateComment_validator_1.default), this.updateComment)
            .delete(this.deleteComment);
        this.router
            .route(this.path)
            .get(validation_middleware_1.default(readComment_validator_1.default), this.readComment)
            .post(validation_middleware_1.default(createComment_validator_1.default), this.createComment);
    }
    readComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const readDTO = {
                postId: Number(req.body.postId)
            };
            return comment_read_1.default(readDTO)
                .then((commentList) => res.status(200).json(commentList))
                .catch((err) => {
                console.error(err);
                next(new PromiseRejection_exception_1.default());
            });
        });
    }
    createComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const createDTO = {
                postId: Number(req.body.postId),
                nickname: req.body.nickname,
                content: req.body.content
            };
            return comment_create_1.default(createDTO)
                .then((newComment) => res.status(201).json(newComment))
                .catch((err) => {
                console.error(err);
                next(new PromiseRejection_exception_1.default());
            });
        });
    }
    updateComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateDTO = {
                commentId: Number(req.body.commentId),
                content: req.body.content
            };
            return comment_update_1.default(updateDTO)
                .then((modifiedComment) => res.status(200).json(modifiedComment))
                .catch((err) => {
                console.error(err);
                next(new PromiseRejection_exception_1.default());
            });
        });
    }
    deleteComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteDTO = {
                commentId: Number(req.params.commentId)
            };
            return comment_delete_1.default(deleteDTO)
                .then(() => res.status(200).json({ isDeleted: true }))
                .catch((err) => {
                console.error(err);
                next(new PromiseRejection_exception_1.default());
            });
        });
    }
}
exports.default = CommentsController;
