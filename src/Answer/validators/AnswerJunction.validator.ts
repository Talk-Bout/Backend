import { Length, IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator'

export default class CreateAnswerJunctionValidator {
  @Length(4, 20)
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nickname: string

  @IsNumber()
  answerId: number
}
