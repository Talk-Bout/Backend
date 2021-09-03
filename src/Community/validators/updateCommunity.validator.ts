import { IsString, IsNotEmpty, IsOptional } from 'class-validator'

export default class UpdateCommunityValidator {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsOptional()
  image: string
}
