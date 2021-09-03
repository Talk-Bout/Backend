import { Length, IsString, IsNotEmpty, IsOptional } from 'class-validator'

export default class DeleteUserValidator {
  @Length(4, 10)
  @IsString()
  @IsNotEmpty()
  nickname: string

  @IsString()
  @IsOptional()
  content: string
}