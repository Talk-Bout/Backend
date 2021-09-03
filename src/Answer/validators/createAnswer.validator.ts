import { Answer } from '@prisma/client'
import { Length, IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

export default class createAnswerValidator {
  @Length(4, 20)
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nickname: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsNumber()
  @IsNotEmpty()
  questionId: number

  @IsOptional()
  image: Answer['image']
}
