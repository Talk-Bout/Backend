"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../Infrastructures/utils/prisma");
exports.default = (DTO) => {
    const Bookmark = prisma_1.prisma.bookmark;
    return Bookmark.findMany({ where: DTO });
};
