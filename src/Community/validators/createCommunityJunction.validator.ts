import { Length, IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

export default class CreateCommunityJunctionValidator {
  @Length(4, 20)
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nickname: string

  @IsNotEmpty()
  @IsNumber()
  communityId: number
}
