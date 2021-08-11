"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../Infrastructures/utils/prisma");
exports.default = (DTO) => {
    const Post = prisma_1.prisma.bookmark;
    return Post.findMany({ where: DTO });
};
