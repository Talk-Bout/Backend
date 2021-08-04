import HttpException from './Http.exception'

export default class UserCreationException extends HttpException {
  constructor() {
    super(401, '로그인 후 이용해주세요.')
  }
}
