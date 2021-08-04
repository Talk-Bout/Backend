import HttpException from './Http.exception'

export default class ValidationFailureException extends HttpException {
  constructor() {
    super(400, '입력값을 확인해주세요.')
  }
}
