import {
  IsString,
  IsNotEmpty,
  Length,
  IsAlphanumeric,
  IsNumber
} from 'class-validator'

export default class createCommentValidator {
  @IsString()
  @IsNotEmpty()
  content: string

  @IsNotEmpty()
  @IsString()
  @Length(4, 10)
  @IsAlphanumeric()
  nickname: string

  @IsNumber()
  @IsNotEmpty()
  communityId: number
}
