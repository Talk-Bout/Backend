import {
  Length,
  IsEmail,
  IsString,
  IsAlphanumeric,
  ValidateIf
} from 'class-validator'

export default class checkUserValidator {
  @ValidateIf((o) => o.nickname)
  @Length(4, 10)
  @IsString()
  @IsAlphanumeric()
  nickname: string

  @ValidateIf((o) => o.nickname == undefined)
  @IsEmail()
  email: string
}
