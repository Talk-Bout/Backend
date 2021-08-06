import { IsNotEmpty, IsNumber } from 'class-validator'

export default class readReviewValidator {
  @IsNumber()
  @IsNotEmpty()
  communityId: number
}
