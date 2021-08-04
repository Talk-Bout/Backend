import {
  IsString,
  IsAlphanumeric,
  IsNotEmpty,
} from 'class-validator'

export default class readPostValidator {
  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  category: string
}