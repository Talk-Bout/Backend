import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export default class deleteCommentValidator {
  @IsNumber()
  @IsNotEmpty()
  commentId: number // string or number 이거를 못하고 있대


}
