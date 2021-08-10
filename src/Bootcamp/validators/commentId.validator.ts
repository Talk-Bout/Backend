import { IsNotEmpty, IsNumber } from 'class-validator'

export default class CommentIdValidator {
  @IsNumber()
  @IsNotEmpty()
  communityCommentId: number
}
