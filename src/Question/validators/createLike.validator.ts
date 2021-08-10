import {
  Length,
  IsString,
  IsNotEmpty,
  IsNumber
} from 'class-validator'

export default class createQuestionValidator {
  @Length(4, 10)
  @IsString()
  @IsNotEmpty()
  nickname: string

  @IsNumber()
  @IsNotEmpty()
  questionId : number

  @IsNumber()
  @IsNotEmpty()
  likeId: number
}