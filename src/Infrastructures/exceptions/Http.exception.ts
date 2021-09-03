export default class HttpException extends Error {
  status: number
  message: string
  meta?: string

  constructor(status: number, message: string, meta?: string) {
    super()
    this.status = status
    this.message = message
    this.meta = meta
  }
}
