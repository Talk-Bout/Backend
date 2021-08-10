import {
  Length,
  IsString,
  IsNotEmpty,
} from 'class-validator'

export default class createQuestionValidator {
  @Length(4, 10)
  @IsString()
  @IsNotEmpty()
  nickname: string

  @IsString()
  @IsNotEmpty()
  title :string

  @IsString()
  @IsNotEmpty()
  content: string
  
}