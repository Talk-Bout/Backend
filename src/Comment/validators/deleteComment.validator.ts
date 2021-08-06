import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export default class deleteCommentValidator {
  @IsNumber()
  @IsNotEmpty()
  commentId: number
}