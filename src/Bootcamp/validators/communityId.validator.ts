import { IsNotEmpty, IsNumber } from 'class-validator'

export default class CommunityIdValidator {
  @IsNumber()
  @IsNotEmpty()
  communityId: number
}
