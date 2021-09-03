import passport from 'passport'
import { prisma } from '../../Infrastructures/utils/prisma'
import { User } from '.prisma/client'

const KakaoStrategy = require('passport-kakao').Strategy
const User = prisma.user

export default () => {
  type UserToken = User & {
    accessToken: string
    refreshToken: string
  }

  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: '/api/oauth/kakao/callback'
      },
      async (accessToken: any, refreshToken: any, profile: any, done: any) => {
        try {
          const user = await User.findFirst({
            where: {
              snsId: String(profile.id),
              provider: 'kakao'
            }
          })

          if (user) {
            const userToken: UserToken = {
              nickname: user.nickname,
              snsId: user.snsId,
              provider: user.provider,
              profilePic: user.profilePic,
              role: user.role,
              accessToken,
              refreshToken
            }
            done(null, userToken)
          } else {
            const newUser = await User.create({
              data: {
                nickname: `User${new Date().getTime()}`,
                snsId: String(profile.id),
                provider: 'kakao'
              }
            })
            const userToken: UserToken = {
              nickname: newUser.nickname,
              snsId: newUser.snsId,
              provider: newUser.provider,
              profilePic: newUser.profilePic,
              role: newUser.role,
              accessToken,
              refreshToken
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
