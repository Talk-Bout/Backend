import {
  IsString,
  IsAlphanumeric,
} from 'class-validator'

export default class readPostValidator {
  @IsString()
  @IsAlphanumeric()
  category: string
}