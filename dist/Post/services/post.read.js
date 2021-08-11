"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../Infrastructures/utils/prisma");
exports.default = (DTO) => {
    const Post = prisma_1.prisma.post;
    return DTO.category ? Post.findMany({ where: DTO }) : Post.findMany({});
};
