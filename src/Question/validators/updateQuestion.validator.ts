import {
  IsString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator'

export default class updateQuestionValidator {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsNumber()
  @IsNotEmpty()
  questionId: number
}
