import HttpException from './Http.exception'

export default class CommentUpdateException extends HttpException {
    constructor() {
        super(400, '댓글 수정 실패: 입력값을 확인해주세요.')
    }
}
