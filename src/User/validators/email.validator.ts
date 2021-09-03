import {
    IsEmail,
    IsString,
    IsNotEmpty
} from 'class-validator'
  
export default class EmailValidator {  
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string
}