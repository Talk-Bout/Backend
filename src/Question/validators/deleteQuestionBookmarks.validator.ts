import {
  IsNumber,
  IsNotEmpty
} from 'class-validator'
  
export default class deleteBookmarkValidator {
  @IsNumber()
  @IsNotEmpty()
  questionBookmarkId: number
}