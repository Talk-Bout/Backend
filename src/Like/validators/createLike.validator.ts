import {
  IsNumber,
  IsNotEmpty,
  IsString,
  IsAlphanumeric,
  Length
} from 'class-validator'
  
export default class createLikeValidator {
  @IsNumber()
  @IsNotEmpty()
  postId: number

  @Length(4, 10)
  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  nickname: string
}