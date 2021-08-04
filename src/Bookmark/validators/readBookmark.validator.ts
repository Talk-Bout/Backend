import { Length, IsString, IsAlphanumeric, IsNotEmpty } from 'class-validator'

export default class readBookmarkValidator {
  @IsNotEmpty()
  @IsString()
  @Length(4, 10)
  @IsAlphanumeric()

  nickname: string
}
