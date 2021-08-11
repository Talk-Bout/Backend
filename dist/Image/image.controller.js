"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imageUpload_middleware_1 = __importDefault(require("../Infrastructures/middlewares/imageUpload.middleware"));
class ImageController {
    constructor() {
        this.path = '/images';
        this.router = express_1.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.route(this.path).post(imageUpload_middleware_1.default, this.saveImage);
    }
    saveImage(req, res) {
        var _a;
        const imageUrl = `/images/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}`;
        return res.status(201).json(imageUrl);
    }
}
exports.default = ImageController;
