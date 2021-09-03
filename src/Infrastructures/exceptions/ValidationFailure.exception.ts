import { ValidationError } from 'class-validator'
import HttpException from './Http.exception'

export default class ValidationFailureException extends HttpException {
  constructor(errors: ValidationError[]) {
    const errs = errors
      .map((validationError) => validationError.constraints)
      .map((constraints) => Object.values(constraints as { [s: string]: string }))
      .map((errorArrays) => errorArrays.reduce((acc, curr) => acc.concat(`, ${curr}`)))
      .reduce((acc, curr) => acc.concat(`, ${curr}`))

    super(400, errs)
  }
}
