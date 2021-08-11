import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Length,
} from 'class-validator'

export default class createPostCommentValidator {
  @IsNumber()
  @IsNotEmpty()
  postId: number

  @IsString()
  @IsNotEmpty()
  content: string

  @IsNotEmpty()
  @IsString()
  @Length(4, 10)
  nickname: string
}