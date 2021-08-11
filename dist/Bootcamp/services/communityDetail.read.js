"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../Infrastructures/utils/prisma");
exports.default = (DTO) => {
    const Community = prisma_1.prisma.community;
    return Community.findUnique({ where: DTO });
};
