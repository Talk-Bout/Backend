import { IsString, IsNotEmpty, Length, IsNumber, IsOptional } from 'class-validator'

export default class CreateReviewValidator {
  @Length(4, 20)
  @IsOptional()
  @IsString()
  @IsNotEmpty()
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
