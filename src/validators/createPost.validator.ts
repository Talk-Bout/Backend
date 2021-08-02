import {
  Length,
  IsString,
  IsAlphanumeric,
  IsNotEmpty,
  Matches,
  IsInt
} from 'class-validator'

export default class createPostValidator {
  @Length(4, 10)
  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  nickname: string

  @Length(1, 30)
  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  title :string


  @Length(1, 500)
  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  content: string 

  @Length(4, 10)
  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  category: string
}
