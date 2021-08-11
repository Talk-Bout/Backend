"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_middleware_1 = __importDefault(require("../../Infrastructures/middlewares/validation.middleware"));
const createBookmark_validator_1 = __importDefault(require("../validators/createBookmark.validator"));
const readBookmark_validator_1 = __importDefault(require("../validators/readBookmark.validator"));
const bookmark_create_1 = __importDefault(require("../services/bookmark.create"));
const bookmark_delete_1 = __importDefault(require("../services/bookmark.delete"));
const bookmark_read_1 = __importDefault(require("../services/bookmark.read"));
const PromiseRejection_exception_1 = __importDefault(require("../../Infrastructures/exceptions/PromiseRejection.exception"));
class BookmarksController {
    constructor() {
        this.path = '/users/:nickname/bookmark';
        this.router = express_1.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .route(this.path)
            .get(validation_middleware_1.default(readBookmark_validator_1.default), this.readBookmark)
            .post(validation_middleware_1.default(createBookmark_validator_1.default), this.createBookmark);
        this.router.route(this.path + '/:bookmarkId').delete(this.deleteBookmark);
    }
    readBookmark(req, res, next) {
        const readDTO = {
            nickname: req.body.nickname
        };
        return bookmark_read_1.default(readDTO)
            .then((bookmarks) => res.status(200).json(bookmarks))
            .catch((err) => {
            console.error(err);
            next(new PromiseRejection_exception_1.default());
        });
    }
    createBookmark(req, res, next) {
        const createDTO = {
            nickname: req.body.nickname,
            postId: req.body.postId
        };
        return bookmark_create_1.default(createDTO)
            .then((newBookmark) => res.status(201).json(newBookmark))
            .catch((err) => {
            console.error(err);
            next(new PromiseRejection_exception_1.default());
        });
    }
    deleteBookmark(req, res, next) {
        const deleteDTO = {
            bookmarkId: Number(req.params.bookmarkId)
        };
        return bookmark_delete_1.default(deleteDTO)
            .then(() => res.status(200).json({ deleted: true }))
            .catch((err) => {
            console.error(err);
            next(new PromiseRejection_exception_1.default());
        });
    }
}
exports.default = BookmarksController;
