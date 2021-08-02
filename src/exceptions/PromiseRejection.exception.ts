import HttpException from './Http.exception'

export default class UserCreationException extends HttpException {
  constructor() {
    super(500, '프로미스 에러: 원인이 불분명한 오류입니다.')
  }
}
