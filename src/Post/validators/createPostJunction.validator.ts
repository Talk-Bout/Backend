import {
  Length,
  IsString,
  IsNumber
} from 'class-validator'

export default class CreatePostValidator {
  @Length(4, 10)
  @IsString()
  nickname: string

  @IsNumber()
  postId: number
}
