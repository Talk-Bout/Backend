import { RequestHandler } from 'express'
import passport from 'passport'

export default (): RequestHandler => {
  return passport.authenticate('bearer', {
    session: false,
    failureRedirect: 'http://talkbout.camp'
  })
}
