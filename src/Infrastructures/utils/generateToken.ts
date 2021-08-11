import jwt from 'jsonwebtoken'

export default (nickname: string) => {
  return jwt.sign({ nickname: nickname }, 'JJS')
}
