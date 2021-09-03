import { IsString, IsNotEmpty, IsNumber, Length, IsOptional } from 'class-validator'

export default class createPostCommentValidator {
  @IsNumber()
  @IsNotEmpty()
  postId: number

  @IsString()
  @IsNotEmpty()
  content: string

  @Length(4, 20)
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nickname: string
}
