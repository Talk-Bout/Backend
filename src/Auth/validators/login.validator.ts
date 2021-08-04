import { Length, IsString, IsNotEmpty, Matches, IsEmail } from 'class-validator'

export default class loginValidator {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @Length(8, 16)
  @IsString()
  @IsNotEmpty()
  @Matches(RegExp(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,16}$/))
  password: string
}
