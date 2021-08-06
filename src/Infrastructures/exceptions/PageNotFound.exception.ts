import HttpException from './Http.exception'

export default class UserCreationException extends HttpException {
  constructor() {
    super(404, '잘못된 경로: 주소(URL)를 확인해주세요.')
  }
}
