"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        cb(null, path_1.default.basename(file.originalname, ext) + Date.now() + ext);
    }
});
const upload = multer_1.default({
    storage: storage
});
exports.default = upload.single('image');
