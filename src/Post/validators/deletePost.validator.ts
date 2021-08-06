import {
  IsNumber,
  IsNotEmpty
} from 'class-validator'
  
export default class deletePostValidator {
  @IsNumber()
  @IsNotEmpty()
  postId: number
}