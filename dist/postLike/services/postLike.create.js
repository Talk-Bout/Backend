"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../Infrastructures/utils/prisma");
exports.default = (DTO) => {
    const Like = prisma_1.prisma.postLike;
    return Like.create({ data: DTO });
};
