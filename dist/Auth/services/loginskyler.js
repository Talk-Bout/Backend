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
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../Infrastructures/utils/prisma");
const bcrypy_1 = require("../../Infrastructures/utils/bcrypy");
exports.default = (DTO) => __awaiter(void 0, void 0, void 0, function* () {
    const User = prisma_1.prisma.user;
    const user = yield User.findFirst({ where: {
            email: DTO.email
        } });
    if (user) {
        if (bcrypy_1.compareHash(DTO.password, user.password)) {
            return user;
        }
        else {
            throw new Error("wrong password");
        }
    }
    else if (!user) {
        throw new Error("User not found");
    }
});
