import {
  Length,
  IsString,
  IsAlphanumeric,
  IsNotEmpty,
  IsNumber,
} from 'class-validator'

export default class createAnswerValidator {
  @Length(4, 10)
  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  nickname: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsNumber()
  @IsNotEmpty()
  questionId: number
}
