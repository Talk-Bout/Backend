import App from './app'
import UsersController from './users/users.controller'
import CommentsController from './comments/comment.controller'

new App([new UsersController(), new CommentsController()])
