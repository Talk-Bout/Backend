import {
    IsString,
    IsNotEmpty,
    IsNumber,
} from 'class-validator'

export default class createCommentValidator {

    @IsNumber()
    @IsNotEmpty()
    postId: number // string or number 이거를 못하고 있대

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    content: string
}