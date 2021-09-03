import { Length, IsString, IsNotEmpty, IsOptional } from 'class-validator'

export default class BootcampJunctionValidator {
  @Length(4, 20)
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nickname: string

  @IsNotEmpty()
  bootcampName: string
}
