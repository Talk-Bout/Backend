import { IsString, IsNotEmpty } from 'class-validator'

export default class UpdateCommunityValidator {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  content: string
}
