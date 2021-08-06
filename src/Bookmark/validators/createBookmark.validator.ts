import {
  Length,
  IsString,
  IsAlphanumeric,
  IsNotEmpty,
  IsNumber
} from 'class-validator'

export default class createBookmarkValidator {
  @IsNotEmpty()
  @IsString()
  @Length(4, 10)
  @IsAlphanumeric()
  nickname: string

  @IsNotEmpty()
  @IsNumber()
  postId: number
}
