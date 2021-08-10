import {
  IsNumber,
  IsNotEmpty
} from 'class-validator'

export default class readDetailValidator {
  @IsNumber()
  @IsNotEmpty()
  questionId: number
}