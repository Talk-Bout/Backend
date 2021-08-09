import jwt from 'jsonwebtoken'
import 'dotenv/config'
require('dotenv').config()

export default (nickname: string) => {
  return jwt.sign({ nickname: nickname }, process.env.JWT)
}
