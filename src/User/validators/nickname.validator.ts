import { Length, IsString, IsNotEmpty } from 'class-validator'

export default class NicknameValidator {
  @Length(4, 10)
  @IsString()
  @IsNotEmpty()
  nickname: string
}
