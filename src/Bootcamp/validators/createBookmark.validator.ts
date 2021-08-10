import {
  Length,
  IsString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator'

export default class createBookmarkValidator {
  @Length(4, 10)
  @IsString()
  @IsNotEmpty()
  nickname: string

  @IsNotEmpty()
  @IsNumber()
  bootcampName : string
}