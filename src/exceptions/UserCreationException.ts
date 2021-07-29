import HttpException from './HttpException'

export default class UserCreationException extends HttpException {
  constructor() {
    super(500, '회원가입 실패: 원인이 불분명한 오류입니다.')
  }
}
