import {
  IsNumber,
  IsNotEmpty
} from 'class-validator'
  
export default class deleteLikeValidator {
  @IsNumber()
  @IsNotEmpty()
  likeId: number

  @IsNumber()
  @IsNotEmpty()
  questionId: number
}