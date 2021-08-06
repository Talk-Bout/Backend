import crypto from 'crypto'
import 'dotenv/config'

export default (password: string) => {
  const HASH_KEY = process.env.HASH_KEY as string
  return crypto.createHmac('sha256', password).update(HASH_KEY).digest('hex')
}
