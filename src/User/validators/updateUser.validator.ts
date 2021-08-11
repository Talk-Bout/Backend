import {
  Length,
  IsEmail,
  IsString,
  IsNotEmpty,
  Matches,
  IsOptional
} from 'class-validator'

export default class updateUserValidator {
  @Length(4, 10)
  @IsString()
  @IsNotEmpty()
  nickname: string

  @Length(8, 16)
  @IsString()
  @IsNotEmpty()
  @Matches(RegExp(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,16}$/))
  password: string

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsOptional()
  profilePic: string

  @IsString()
  @IsOptional()
  role: string
}
