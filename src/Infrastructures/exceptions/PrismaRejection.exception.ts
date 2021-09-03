import HttpException from './Http.exception'

export default class PrismaRejectionException extends HttpException {
  constructor(status: number, message: string, meta?: object) {
    const field =
      meta && Object.values(meta).reduce((acc, curr) => acc.concat(`, ${curr}`))
    super(status, message, field)
  }
}
