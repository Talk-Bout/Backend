"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
//import * as GoogleStrategy  from 'passport-google-oauth20'
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const prisma_1 = require("../../../Infrastructures/utils/prisma");
//import { stringify } from 'querystring'
const User = prisma_1.prisma.user;
const generateToken_1 = __importDefault(require("../../../Infrastructures/utils/generateToken"));
require("dotenv/config");
// //serialize
// // get info -> put it in cookie
// passport.serializeUser((targetUser, done) => {
//     console.log(targetUser,"here from 16" )
//     done(null, targetUser.nickname); // req.session.passport.user 저장?
// })
// //deserialize
// // get cookie and find the user 
// passport.deserializeUser((nickname, done) => {
//     // 까서 나온 user정보  db조회
//     User.findUnique({where:{nickname:nickname}}).then((user) => {
//         done(null, user)
//     })
// })
passport_1.default.use(new GoogleStrategy({
    //options for the google strategy
    callbackURL: '/auth/google/redirect',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    //passport callback function
    const email = profile.emails[0].value;
    const googleId = profile.id;
    const id = String(profile.id).substr(18);
    const foundUser = yield User.findUnique({ where: { googleId } });
    if (foundUser) {
        // already have user in our db
        console.log("user is", foundUser);
        const token = generateToken_1.default(foundUser.nickname);
        const targetUser = { foundUser, token };
        return done(null, targetUser);
    }
    else {
        // new user to create in our db
        yield User.create({ data: {
                email: email,
                googleId: googleId,
                nickname: profile.displayName + id
            } }).then((newUser) => {
            console.log(`new user created:   ${newUser}`);
            const token = generateToken_1.default(newUser.nickname);
            const targetUser = { newUser, token };
            return done(null, targetUser);
        });
    }
})));
