import HttpException from './Http.exception'

export default class CommentDeletionException extends HttpException {
    constructor() {
        super(400, '댓글 삭제 실패: 입력값을 확인해주세요.')
    }
}
