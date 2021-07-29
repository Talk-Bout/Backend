import HttpException from './HttpException'

export default class UserValidationException extends HttpException {
  constructor() {
    super(400, '회원가입 실패: 입력값을 확인해주세요.')
  }
}
