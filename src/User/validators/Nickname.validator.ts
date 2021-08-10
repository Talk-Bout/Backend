import { Length, IsString, IsAlphanumeric, IsNotEmpty } from 'class-validator'

export default class NicknameValidator {
  @Length(4, 10)
  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  nickname: string
}
