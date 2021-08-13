import {
  Length,
  IsString,
  IsNotEmpty,
  IsNumber,

} from 'class-validator'

export default class getAnswerValidator {
  

  @IsNumber()
  @IsNotEmpty()
  questionId: number

  @IsNumber()
  @IsNotEmpty()
  page: number

}
