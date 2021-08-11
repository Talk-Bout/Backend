"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../Infrastructures/utils/prisma");
//import  
exports.default = (DTO) => {
    const User = prisma_1.prisma.user;
    return User.findFirst({ where: DTO });
};
