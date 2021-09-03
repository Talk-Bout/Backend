import { Length, IsString, IsNotEmpty, IsOptional } from 'class-validator'

export default class updateUserValidator {
  @Length(4, 20)
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nickname: string

  @IsString()
  @IsOptional()
  profilePic: string

  @IsString()
  @IsOptional()
  role: string
}
