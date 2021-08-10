import { IsNotEmpty, IsString } from 'class-validator'

export default class UpdateCommentValidator {
  @IsString()
  @IsNotEmpty()
  content: string
}
