import {
  IsString,
  IsNotEmpty,
  Length,
  IsAlphanumeric,
  IsNumber
} from 'class-validator'

export default class createReviewValidator {
  @IsNotEmpty()
  @IsString()
  @Length(4, 10)
  @IsAlphanumeric()
  nickname: string

  @IsNotEmpty()
  @IsString()
  bootcampName: string

  @IsString()
  status: string

  @IsString()
  pros: string

  @IsString()
  cons: string

  @IsNumber()
  stars: number
}
