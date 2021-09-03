import { Post } from '@prisma/client'
import { Length, IsString, IsNotEmpty, IsOptional } from 'class-validator'

export default class CreatePostValidator {
  @Length(4, 20)
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nickname: string

  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsString()
  @IsNotEmpty()
  category: string

  @IsOptional()
  image: Post['image']
}
