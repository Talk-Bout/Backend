import { IsNotEmpty, IsString } from 'class-validator'

export default class BootcampNameValidator {
  @IsString()
  @IsNotEmpty()
  bootcampName: string
}
