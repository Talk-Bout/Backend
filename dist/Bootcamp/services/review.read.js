"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../Infrastructures/utils/prisma");
exports.default = (DTO) => {
    const Review = prisma_1.prisma.review;
    return Review.findMany({ where: DTO });
};