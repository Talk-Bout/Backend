import { IsString, IsNotEmpty, IsNumber, Length,IsAlphanumeric } from 'class-validator'

export default class createCommentValidator {
  @IsNumber()
  @IsNotEmpty()
  postId: number

  @IsString()
  @IsNotEmpty()
  content: string

  @IsNotEmpty()
  @IsString()
  @Length(4, 10)
  @IsAlphanumeric()
  nickname: string
}
