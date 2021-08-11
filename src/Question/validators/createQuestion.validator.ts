import {
  Length,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator'

export default class CreateQuestionValidator {
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

  @IsOptional()
  image: string
}