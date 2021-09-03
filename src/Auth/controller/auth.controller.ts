import { Router, Request, Response, NextFunction } from 'express'
import Controller from '../../Infrastructures/interfaces/controller.interface'
import axios from 'axios'
import { prisma } from '../../Infrastructures/utils/prisma'
import prismaException from '../../Infrastructures/utils/prismaException'
import passport, { AuthenticateOptions } from 'passport'
import authenticate from '../../Infrastructures/middlewares/authentication.middleware'

export default class AuthController implements Controller {
  public readonly path = '/api/oauth'
  public readonly router = Router()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    type passportOptions = AuthenticateOptions & {
      accessType: any
    }

    this.router.get(
      this.path + '/kakao',
      passport.authenticate('kakao', {
        session: false
      })
    )

    this.router.get(
      this.path + '/kakao/callback',
      passport.authenticate('kakao', {
        session: false,
        failureRedirect: 'http://talkbout.camp'
      }),
      this.kakaoCallback
    )

    this.router.get(
      this.path + '/google',
      passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login'],
        accessType: 'offline',
        prompt: 'consent'
      } as passportOptions)
    )

    this.router.get(
      this.path + '/google/callback',
      passport.authenticate('google', {
        session: false,
        failureRedirect: 'http://talkbout.camp'
      }),
      this.googleCallback
    )

    this.router.get(this.path + '/tokenUser', authenticate(), this.tokenUser)

    this.router.post(this.path + '/logout', this.logout)
  }

  private kakaoCallback(req: Request, res: Response, next: NextFunction) {
    type UserToken = Express.User & {
      accessToken?: string
      refreshToken?: string
      provider?: string
      nickname?: string
      profilePic?: string | null
    }

    const userToken: UserToken | undefined = req.user

    res.redirect(
      'http://talkbout.camp/profile?accessToken=' +
        userToken?.accessToken +
        '&refreshToken=' +
        userToken?.refreshToken +
        '&provider=' +
        userToken?.provider +
        '&nickname=' +
        userToken?.nickname +
        '&profilePic=' +
        userToken?.profilePic
    )
  }

  private googleCallback(req: Request, res: Response, next: NextFunction) {
    type UserToken = Express.User & {
      accessToken?: string
      refreshToken?: string
      provider?: string
      nickname?: string
      profilePic?: string | null
      idToken?: string
    }

    const userToken: UserToken | undefined = req.user

    res.redirect(
      'http://talkbout.camp/profile?accessToken=' +
        userToken?.accessToken +
        '&refreshToken=' +
        userToken?.refreshToken +
        '&provider=' +
        userToken?.provider +
        '&nickname=' +
        userToken?.nickname +
        '&profilePic=' +
        userToken?.profilePic +
        '&idToken=' +
        userToken?.idToken
    )
  }

  private async tokenUser(req: Request, res: Response, next: NextFunction) {
    const User = prisma.user
    const nickname = req.user as string

    const userInfo = await User.findUnique({ where: { nickname } }).catch((err) =>
      prismaException(err, next)
    )

    return res
      .status(200)
      .json({ nickname: userInfo?.nickname, profilePic: userInfo?.profilePic })
  }

  private async logout(req: Request, res: Response, next: NextFunction) {
    const KAKAO_LOG_OUT = 'https://kapi.kakao.com/v1/user/logout'
    const GOOGLE_LOG_OUT = 'https://oauth2.googleapis.com/revoke?token='

    const { authorization } = req.headers
    const [authType, authToken] = (authorization || '').split(' ')
    const provider = req.body.provider

    if (!authToken || authType !== 'Bearer') {
      return res.status(401).redirect('http://talkbout.camp/login')
    }

    let oauth

    if (provider == 'kakao') {
      oauth = KAKAO_LOG_OUT
    }

    if (provider == 'google') {
      oauth = GOOGLE_LOG_OUT + `${authToken}`
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

    return axios
      .post(oauth as string)
      .then((response) => console.log(response.data))
      .then(() => res.status(200).json({ logOut: true }))
      .catch((err) => console.error(err))
  }
}
