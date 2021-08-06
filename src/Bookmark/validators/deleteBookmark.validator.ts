import { IsNotEmpty, IsNumber } from 'class-validator'

export default class deleteBookmarkValidator {
  @IsNotEmpty()
  @IsNumber()
  bookmarkId: number
}
