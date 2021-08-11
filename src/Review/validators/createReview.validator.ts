import {
  IsString,
  IsNotEmpty,
  Length,
  IsNumber
} from 'class-validator'

export default class CreateReviewValidator {
  @IsNotEmpty()
  @IsString()
  @Length(4, 10)
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

  @IsString()
  title: string
}
