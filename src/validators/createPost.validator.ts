import {
  Length,
  IsString,
  IsAlphanumeric,
  IsNotEmpty,
} from 'class-validator'

export default class createPostValidator {
  @Length(4, 10)
  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  nickname: string

  @IsString()
  @IsNotEmpty()
  title :string

  @IsString()
  @IsNotEmpty()
  content: string 

  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  category: string
}
