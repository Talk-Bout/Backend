import {
  IsString,
  IsNotEmpty,
  Length,
  IsNumber
} from 'class-validator'

export default class CreateCommunityCommentValidator {
  @IsString()
  @IsNotEmpty()
  content: string

  @IsNotEmpty()
  @IsString()
  @Length(4, 10)
  nickname: string

  @IsNumber()
  @IsNotEmpty()
  communityId: number
}
