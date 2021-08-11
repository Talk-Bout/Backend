import { IsString, IsNotEmpty, Length, IsOptional } from 'class-validator'

export default class CreateCommunityValidator {
  @IsNotEmpty()
  @IsString()
  @Length(4, 10)
  nickname: string

  @IsNotEmpty()
  @IsString()
  bootcampName: string

  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsOptional()
  image: string
}
