import {
  IsString,
  IsNotEmpty,
  IsInt,
} from 'class-validator'

export default class createPostValidator {

  @IsString()
  @IsNotEmpty()
  content: string 

 @IsInt()
 @IsNotEmpty()
  postId: number  
}
