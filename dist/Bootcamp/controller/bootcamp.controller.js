"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PromiseRejection_exception_1 = __importDefault(require("../../Infrastructures/exceptions/PromiseRejection.exception"));
const bootcamp_read_1 = __importDefault(require("../services/bootcamp.read"));
const review_read_1 = __importDefault(require("../services/review.read"));
const review_create_1 = __importDefault(require("../services/review.create"));
// import readCommunityDetailValidator from '../validators/readCommunityDetail.validator'
// import readCommunity from '../services/community.read'
// import readCommunityDetail from '../services/communityDetail.read'
class BootcampController {
    constructor() {
        this.path = '/bootcamp';
        this.reviewPath = '/bootcamp/:bootcampName/review';
        this.router = express_1.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.route(this.path).get(this.getBootcamp);
        this.router.route(this.reviewPath).get(this.getReview);
        this.router.route(this.reviewPath).post(this.postReview);
    }
    getBootcamp(req, res, next) {
        return bootcamp_read_1.default()
            .then((bootcampList) => res.status(200).json(bootcampList))
            .catch((err) => {
            console.error(err);
            next(new PromiseRejection_exception_1.default());
        });
    }
    getReview(req, res, next) {
        const readReviewDTO = {
            bootcampName: req.body.bootcampName
        };
        return review_read_1.default(readReviewDTO)
            .then((reviews) => res.status(200).json(reviews))
            .catch((err) => {
            console.error(err);
            next(new PromiseRejection_exception_1.default());
        });
    }
    postReview(req, res, next) {
        const createReviewDTO = {
            nickname: req.body.nickname,
            bootcampName: req.body.bootcampName,
            season: req.body.season,
            pros: req.body.pros,
            cons: req.body.cons,
            stars: req.body.stars
        };
        return review_create_1.default(createReviewDTO)
            .then(() => res.status(201).json({ isCreated: true }))
            .catch((err) => {
            console.error(err);
            next(new PromiseRejection_exception_1.default());
        });
    }
}
exports.default = BootcampController;
