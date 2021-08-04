import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export default class readCommentValidator {
  @IsNumber()
  @IsNotEmpty()
  postId: number // string or number 이거를 못하고 있대

}
