import { IsNotEmpty, IsNumber } from 'class-validator'

export default class readCommentValidator {
  @IsNumber()
  @IsNotEmpty()
  postId: number
}