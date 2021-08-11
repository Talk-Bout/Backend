"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../Infrastructures/utils/prisma");
exports.default = () => {
    const Bootcamp = prisma_1.prisma.bootCamp;
    return Bootcamp.findMany({
        include: {
            review: {
                select: {
                    stars: true // how to get average?
                }
            }
        }
    });
};
