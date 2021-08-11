"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = exports.generateHash = void 0;
const bcrypt = __importStar(require("bcrypt"));
function generateHash(password) {
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}
exports.generateHash = generateHash;
function compareHash(password, hashed) {
    return bcrypt.compareSync(password, hashed);
}
exports.compareHash = compareHash;
// const a = "1q2w3e4r"
// const b = "1q2w3e4r"
// const ah= generateHash(a)
// generateHash(b)
// console.log(compareHash("1q2w3e4r",ah))
//console.log(compareHash("1q2w3e4r", "$2b$12$26CTf6RN8twMcBPABU1Ni.SeEx6cc1ajeL/X6iZ/0vY2DJSHi.Qcu")) 
