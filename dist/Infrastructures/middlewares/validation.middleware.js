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
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const ValidationFailure_exception_1 = __importDefault(require("../exceptions/ValidationFailure.exception"));
exports.default = (type) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = yield class_validator_1.validate(class_transformer_1.plainToClass(type, req.body));
        console.log(errors);
        return errors.length > 0 ? next(new ValidationFailure_exception_1.default()) : next();
    });
};
