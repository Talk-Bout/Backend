import { Post } from '@prisma/client'
import { IsString, IsAlphanumeric, IsNotEmpty, IsOptional } from 'class-validator'

export default class UpdatePostValidator {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  category: string

  @IsOptional()
  image: Post['image']
}
