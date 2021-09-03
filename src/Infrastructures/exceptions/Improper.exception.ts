import HttpException from './Http.exception'

export default class ImproperException extends HttpException {
  constructor() {
    super(400, '도배 또는 욕설을 포함할 수 없습니다.')
  }
}
