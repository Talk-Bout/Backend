import HttpException from './Http.exception'

export default class WhoAreYouException extends HttpException {
  constructor() {
    super(401, '너는 누구니?')
  }
}
