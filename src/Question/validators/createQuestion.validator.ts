import {
  Length,
  IsString,
  IsAlphanumeric,
  IsNotEmpty,
} from 'class-validator'

export default class createQuestionValidator {
  @Length(4, 10)
  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  nickname: string

  @IsString()
  @IsNotEmpty()
  title :string

  @IsString()
  @IsNotEmpty()
  content: string
}