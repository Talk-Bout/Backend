import {
  IsNotEmpty,
  IsString,
  Length,
  IsAlphanumeric,
  IsNumber
} from 'class-validator'

export default class CreateLikeValidator {
  @IsNotEmpty()
  @IsString()
  @Length(4, 10)
  @IsAlphanumeric()
  nickname: string

  @IsNumber()
  @IsNotEmpty()
  communityId: number
}
