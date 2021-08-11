"use strict";
// import * as passport from 'passport'
// import * as GoogleStrategy from 'passport-google-oauth20'
// //import * as LocalStrategy from 'passport-local'
// const LocalStrategy = require('passport-local').strategy
// import 'dotenv/config'
// //.env
// import { prisma } from '../../../Infrastructures/utils/prisma'
// const User = prisma.user
// //serialize
// // get info -> put it in cookie
// passport.serializeUser((user, done) => {
//     done(null, user.id);
// })
// //deserialize
// // get cookie and find the user 
// passport.deserializeUser((id, done) => {
//     User.findById(id).then((user) => {
//         done(null, user)
//     })
// })
// passport.use(new LocalStrategy({
//     usernameField: 'email'
//   },
//   function(username, password, done) {
//     // ...
//   }
// ));
// passport.use(
//     new GoogleStrategy({
//         //options for the google strategy
//         callbackURL: '/auth/google/redirect',
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_SECRET
//     }, async (accessToken, refreshToken, profile, done) => {
//         //passport callback function
//         // check if user already exist in our db 
//         const foundUser = await User.findUnique({ googleId: profile.Id })
//         if (foundUser) {
//             // already have user in our db
//             console.log("user is", foundUser)
//             done(null, foundUser)
//         } else {
//             // new user to create in our db
//             new User({
//                 username: profile.displayName,
//                 googleId: profile.Id
//             }).save().then((newUser) => {
//                 console.log(`new user created:   ${newUser}`)
//                 done(null, newUser)
//             })
//         }
//     })
// )
