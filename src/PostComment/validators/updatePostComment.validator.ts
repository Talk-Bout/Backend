import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export default class updatePostCommentValidator {
  @IsString()
  @IsNotEmpty()
  content: string
}