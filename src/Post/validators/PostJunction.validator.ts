import { Length, IsNumber, IsOptional, IsString, IsNotEmpty } from 'class-validator'

export default class CreatePostValidator {
  @Length(4, 20)
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nickname: string

  @IsNumber()
  postId: number
}
