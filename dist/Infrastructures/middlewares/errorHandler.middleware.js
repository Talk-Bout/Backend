"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(error, req, res, next) {
    const status = error.status || 500;
    const message = error.message || 'Unknown Error... Happy Coding!';
    console.log(status, message);
    res.status(status).send({
        status,
        message
    });
}
exports.default = errorMiddleware;
