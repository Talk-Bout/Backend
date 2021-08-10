import {
  Length,
  IsString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator'

export default class createCommunityBookmarkValidator {
  @Length(4, 10)
  @IsString()
  @IsNotEmpty()
  nickname: string

  @IsNotEmpty()
  @IsNumber()
  communityId : number
}