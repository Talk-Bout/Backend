"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const errorHandler_middleware_1 = __importDefault(require("./middlewares/errorHandler.middleware"));
const log_1 = __importDefault(require("./utils/log"));
require("dotenv/config");
const passport_1 = require("passport");
const passport_2 = require("passport");
class App {
    constructor(controllers) {
        this.app = express_1.default();
        this.port = Number(process.env.PORT) || 3000;
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandler();
        this.listen(this.port);
    }
    initializeMiddlewares() {
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default({ credentials: true }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        require('../Auth/Passport/config/passport');
        this.app.use(passport_1.initialize());
        this.app.use(passport_2.session());
    }
    initializeControllers(controllers) {
        this.app.use('/images', express_1.default.static('uploads'));
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }
    initializeErrorHandler() {
        this.app.use(errorHandler_middleware_1.default);
    }
    listen(port) {
        this.app.listen(this.port, () => log_1.default(this.port));
    }
}
exports.default = App;
