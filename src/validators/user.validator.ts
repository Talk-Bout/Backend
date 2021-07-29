import {
  Length,
  IsEmail,
  IsString,
  IsAlphanumeric,
  IsNotEmpty
} from 'class-validator'

export default class User {
  @Length(4, 10)
  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  nickname: string

  @Length(8, 16)
  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  password: string

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string
}
