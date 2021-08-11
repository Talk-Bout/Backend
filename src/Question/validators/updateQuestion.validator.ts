import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Length
} from 'class-validator'

export default class UpdateQuestionValidator {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  content: string

  @Length(4, 10)
  @IsString()
  nickname: string

  @IsOptional()
  image: string
}
