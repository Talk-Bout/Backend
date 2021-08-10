import { IsString, IsNotEmpty, Length, IsAlphanumeric } from 'class-validator'

export default class CreateCommunityValidator {
  @IsNotEmpty()
  @IsString()
  @Length(4, 10)
  @IsAlphanumeric()
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
}
