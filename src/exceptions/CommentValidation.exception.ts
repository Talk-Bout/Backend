import HttpException from './Http.exception'

export default class CommentValidationException extends HttpException {
    constructor() {
        super(400, '댓글 작성 실패: 입력값을 확인해주세요.')
    }
}
