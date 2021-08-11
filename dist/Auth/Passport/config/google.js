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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport = __importStar(require("passport"));
//import * as GoogleStrategy  from 'passport-google-oauth20'
var GoogleStrategy = require('passport-google-oauth20').strategy;
require("dotenv/config");
const prisma_1 = require("../../../Infrastructures/utils/prisma");
const User = prisma_1.prisma.user;
// //serialize
// // get info -> put it in cookie
// passport.serializeUser((user, done) => {
//     done(null, user.emails[0].value);
// })
// //deserialize
// // get cookie and find the user 
// passport.deserializeUser((email, done) => {
//     User.findUnique({where:{email: email}}).then((user) => {
//         done(null, user)
//     })
// })
passport.use(new GoogleStrategy({
    //options for the google strategy
    callbackURL: '/auth/google/redirect',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    //passport callback function
    console.log(profile);
    // // check if user already exist in our db 
    // const foundUser = await User.findUnique({ email: profile.emails[0].value})
    // if (foundUser) {
    //     // already have user in our db
    //     console.log("user is", foundUser)
    //     // done(null, foundUser)
    // } else {
    //     // new user to create in our db
    //     new User({
    //         username: profile.displayName,
    //         googleId: profile.Id
    //     }).save().then((newUser) => {
    //         console.log(`new user created:   ${newUser}`)
    //         // done(null, newUser)
    //     })
    // }
})));
