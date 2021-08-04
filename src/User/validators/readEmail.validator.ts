import {
    IsEmail,
    IsString,
    IsNotEmpty
} from 'class-validator'
  
export default class checkEmailValidator {  
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string
}
  