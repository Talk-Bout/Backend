import passport from 'passport'
import axios from 'axios'
import { prisma } from '../../Infrastructures/utils/prisma'
import { OAuth2Client } from 'google-auth-library'

const User = prisma.user
const BearerStrategy = require('passport-http-bearer').Strategy
const client = new OAuth2Client(process.env.GOOGLE_ID)

export default () => {
  passport.use(
    new BearerStrategy(async (token: any, done: any) => {
      if (token.length < 70) {
        // Kakao Verification
        const KAKAO = 'https://kapi.kakao.com/v1/user/access_token_info'
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

        const kakaoUser = await axios
          .get(KAKAO)
          .then((response) => response.data.id)
          .catch((err) => console.log(err))

        const user = await User.findUnique({
          where: {
            snsId_provider: {
              snsId: String(kakaoUser),
              provider: 'kakao'
            }
          }
        })
        console.log('KAKAO USER ::::::::::: ', user)
        return done(null, user?.nickname)
      } else {
        // Google Verification
        const googleVerification = async function () {
          const ticket = await client.verifyIdToken({
            idToken: `${token}`,
            audience: process.env.GOOGLE_ID
          })
          const payload = ticket.getPayload()
          const userid = payload?.sub

          return userid
        }

        const googleUser = await googleVerification().catch((err) => console.error(err))

        const user = await User.findUnique({
          where: {
            snsId_provider: {
              snsId: String(googleUser),
              provider: 'google'
            }
          }
        })

        return done(null, user?.nickname)
      }
    })
  )
}
