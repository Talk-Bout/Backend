import {
  Length,
  IsString,
  IsAlphanumeric,
  IsNotEmpty,
  IsOptional
} from 'class-validator'

export default class CreatePostValidator {
  @Length(4, 10)
  @IsString()
  nickname: string

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
  image: string
}
