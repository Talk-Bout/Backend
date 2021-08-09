import {
  IsNumber,
  IsNotEmpty
} from 'class-validator'
  
export default class deleteDetailValidator {
  @IsNumber()
  @IsNotEmpty()
  questionId: number
}