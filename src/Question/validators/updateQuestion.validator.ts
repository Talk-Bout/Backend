import { Question } from '@prisma/client'
import { IsString, IsNotEmpty, IsOptional } from 'class-validator'

export default class UpdateQuestionValidator {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsOptional()
  image: Question['image']
}
