import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export default class updateCommentValidator {
  @IsNumber()
  @IsNotEmpty()
  commentId: number 

  @IsString()
  @IsNotEmpty()
  content: string
}