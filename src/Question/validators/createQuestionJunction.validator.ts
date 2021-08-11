import {
  Length,
  IsString,
  IsNotEmpty,
  IsNumber
} from 'class-validator'

export default class CreateQuestionJunctionValidator {
  @Length(4, 10)
  @IsString()
  @IsNotEmpty()
  nickname: string

  @IsNumber()
  @IsNotEmpty()
  questionId : number
}