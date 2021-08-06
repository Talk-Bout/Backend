import { IsNumber, IsNotEmpty } from 'class-validator'

export default class deleteLikeValidator {
  @IsNumber()
  @IsNotEmpty()
  postLikeId: number
}
