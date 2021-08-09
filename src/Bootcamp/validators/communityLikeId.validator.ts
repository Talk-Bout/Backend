import { IsNotEmpty, IsNumber } from 'class-validator'

export default class CommunityLikeIdValidator {
  @IsNumber()
  @IsNotEmpty()
  communityLikeId: number
}
