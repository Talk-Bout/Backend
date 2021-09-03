import { IsString, IsNotEmpty, Length, IsOptional } from 'class-validator'

export default class CreateCommunityValidator {
  @Length(4, 20)
  @IsOptional()
  @IsString()
  @IsNotEmpty()
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
