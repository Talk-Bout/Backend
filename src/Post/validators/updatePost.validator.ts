import {
  Length,
  IsString,
  IsAlphanumeric,
  IsNotEmpty,
  IsNumber,
  IsOptional
} from 'class-validator'

export default class updatePostValidator {
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

  @IsNumber()
  @IsNotEmpty()
  postId: number

  @IsOptional()
  image: string
}
