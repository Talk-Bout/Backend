import { Length, IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

export default class QuestionJunctionValidator {
  @Length(4, 20)
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nickname: string

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  questionId: number
}
