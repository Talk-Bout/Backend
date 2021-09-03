import axios from 'axios'

export default async (refreshToken: string) => {
  const GOOGLE = 'https://oauth2.googleapis.com/token'
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

  const result = await axios.post(GOOGLE, {
    client_id: process.env.GOOGLE_ID,
    client_secret: process.env.GOOGLE_SECRET,
    refresh_token: refreshToken,
    grant_type: 'refresh_token'
  })

  return result.data
}
