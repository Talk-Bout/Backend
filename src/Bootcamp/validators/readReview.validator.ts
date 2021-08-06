import { IsNotEmpty, IsString } from 'class-validator'

export default class readReviewValidator {
  @IsString()
  @IsNotEmpty()
  bootcampName: string
}
