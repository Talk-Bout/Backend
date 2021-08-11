"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../Infrastructures/utils/prisma");
exports.default = (DTO) => {
    const postLike = prisma_1.prisma.postLike;
    return postLike.delete({ where: DTO });
};
