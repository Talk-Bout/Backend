import passport from 'passport'
import { prisma } from '../../Infrastructures/utils/prisma'
import { User } from '.prisma/client'
import googleRefreshToken from '../../Infrastructures/utils/googleRefreshToken'

const googleStrategy = require('passport-google-oauth20').Strategy
const User = prisma.user

export default () => {
  type UserToken = User & {
    accessToken: string
    refreshToken: string
    idToken: string
  }

  passport.use(
    new googleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: '/api/oauth/google/callback'
      },
      async (accessToken: any, refreshToken: any, profile: any, done: any) => {
        // console.log(accessToken, refreshToken, profile)
        try {
          const user = await User.findFirst({
            where: {
              snsId: profile.id,
              provider: 'google'
            }
          })

          if (user) {
            const token = await googleRefreshToken(refreshToken)
            console.log(token)
            const userToken: UserToken = {
              nickname: user.nickname,
              snsId: user.snsId,
              provider: user.provider,
              profilePic: user.profilePic,
              role: user.role,
              accessToken,
              refreshToken,
              idToken: token.id_token
            }
            done(null, userToken)
          } else {
            const newUser = await User.create({
              data: {
                nickname: `User${new Date().getTime()}`,
                snsId: profile.id,
                provider: 'google'
              }
            })
            const token = await googleRefreshToken(refreshToken)
            const userToken: UserToken = {
              nickname: newUser.nickname,
              snsId: newUser.snsId,
              provider: newUser.provider,
              profilePic: newUser.profilePic,
              role: newUser.role,
              accessToken,
              refreshToken,
              idToken: token.id_token
            }
            done(null, userToken)
          }
        } catch (err) {
          console.error(err)
          done(err)
        }
      }
    )
  )
}
