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
const validation_middleware_1 = __importDefault(require("../../Infrastructures/middlewares/validation.middleware"));
const createPost_validator_1 = __importDefault(require("../validators/createPost.validator"));
const updatePost_validator_1 = __importDefault(require("../validators/updatePost.validator"));
const readDetail_validator_1 = __importDefault(require("../validators/readDetail.validator"));
const PromiseRejection_exception_1 = __importDefault(require("../../Infrastructures/exceptions/PromiseRejection.exception"));
const post_create_1 = __importDefault(require("../services/post.create"));
const post_read_1 = __importDefault(require("../services/post.read"));
const post_update_1 = __importDefault(require("../services/post.update"));
const post_delete_1 = __importDefault(require("../services/post.delete"));
const post_detail_1 = __importDefault(require("../services/post.detail"));
const post_search_1 = __importDefault(require("../services/post.search"));
class PostsController {
    constructor() {
        this.path = '/posts';
        this.path2 = '/keyword'; // question =>  posts/keyword   vs 
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .route(this.path)
            .get(this.readPost)
            .post(validation_middleware_1.default(createPost_validator_1.default), this.createPost);
        this.router
            .route(this.path + '/:postId')
            .get(validation_middleware_1.default(readDetail_validator_1.default), this.readDetail)
            .patch(validation_middleware_1.default(updatePost_validator_1.default), this.updatePost)
            .delete(this.deletePost);
        this.router
            .route(this.path2)
            .get(this.getKeywordResult);
    }
    getKeywordResult(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("hihihihiihi");
            const keywordDTO = req.query.keyword;
            const result = yield post_search_1.default(keywordDTO);
            res.status(200).json({ result });
        });
    }
    createPost(req, res, next) {
        const createDTO = {
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            nickname: req.body.nickname,
            image: req.body.image
        };
        return post_create_1.default(createDTO)
            .then(() => res.status(201).json({ isCreated: true }))
            .catch((err) => {
            console.error(err);
            next(new PromiseRejection_exception_1.default());
        });
    }
    readPost(req, res, next) {
        const readDTO = {
            category: req.body.category || undefined
        };
        return post_read_1.default(readDTO)
            .then((posts) => res.status(200).json(posts))
            .catch((err) => {
            console.error(err);
            next(new PromiseRejection_exception_1.default());
        });
    }
    readDetail(req, res, next) {
        const detailDTO = {
            postId: Number(req.body.postId)
        };
        return post_detail_1.default(detailDTO)
            .then((post) => res.status(200).json(post))
            .catch((err) => {
            console.error(err);
            next(new PromiseRejection_exception_1.default());
        });
    }
    deletePost(req, res, next) {
        const deleteDTO = {
            postId: Number(req.params.postId)
        };
        return post_delete_1.default(deleteDTO)
            .then(() => res.status(200).json({ isDeleted: true }))
            .catch((err) => {
            console.error(err);
            next(new PromiseRejection_exception_1.default());
        });
    }
    updatePost(req, res, next) {
        const updateDTO = {
            title: req.body.title,
            postId: Number(req.body.postId),
            content: req.body.content,
            category: req.body.category,
            image: req.body.image
        };
        return post_update_1.default(updateDTO)
            .then(() => res.status(200).json({ isUpdated: true }))
            .catch((err) => {
            console.error(err);
            next(new PromiseRejection_exception_1.default());
        });
    }
}
exports.default = PostsController;
