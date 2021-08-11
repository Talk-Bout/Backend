"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
class createReviewValidator {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.Length(4, 10),
    class_validator_1.IsAlphanumeric()
], createReviewValidator.prototype, "nickname", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString()
], createReviewValidator.prototype, "bootcampName", void 0);
__decorate([
    class_validator_1.IsString()
], createReviewValidator.prototype, "season", void 0);
__decorate([
    class_validator_1.IsString()
], createReviewValidator.prototype, "pros", void 0);
__decorate([
    class_validator_1.IsString()
], createReviewValidator.prototype, "cons", void 0);
__decorate([
    class_validator_1.IsNumber()
], createReviewValidator.prototype, "stars", void 0);
exports.default = createReviewValidator;
