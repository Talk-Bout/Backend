import {
  Length,
  IsString,
  IsNumber
} from 'class-validator'
  
export default class CreateAnswerJunctionValidator {
  @Length(4, 10)
  @IsString()
  nickname: string

  @IsNumber()
  answerId: number
}