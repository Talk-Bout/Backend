import { IsString, IsNotEmpty, Length, IsNumber, IsOptional } from 'class-validator'

export default class CreateCommunityCommentValidator {
  @IsString()
  @IsNotEmpty()
  content: string

  @Length(4, 20)
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nickname: string

  @IsNumber()
  @IsNotEmpty()
  communityId: number
}
