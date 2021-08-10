import {
    Length,
    IsString,
    IsNotEmpty
} from 'class-validator'
  
export default class createUserValidator {
    @Length(4, 10)
    @IsString()
    @IsNotEmpty()
    nickname: string
}