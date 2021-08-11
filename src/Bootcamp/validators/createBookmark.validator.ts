import {
  Length,
  IsString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator'

export default class CreateBootcampJunctionValidator {
  @Length(4, 10)
  @IsString()
  @IsNotEmpty()
  nickname: string

  @IsNotEmpty()
  bootcampName : string
}