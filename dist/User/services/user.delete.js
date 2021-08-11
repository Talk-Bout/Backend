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
exports.default = (DTO) => __awaiter(void 0, void 0, void 0, function* () {
    const User = prisma_1.prisma.user;
    const Post = prisma_1.prisma.post;
    const Comment = prisma_1.prisma.comment;
    const { nickname } = DTO;
    //await Comment.deleteMany({where: {nickname}})
    //await Post.deleteMany({where: {nickname}})
    return User.delete({ where: DTO });
});
