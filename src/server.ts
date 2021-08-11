import App from './Infrastructures/app'
import UsersController from './User/controller/users.controller'
import AuthController from './Auth/controller/auth.controller'
import PostsController from './Post/controller/posts.controller'
import PostCommentsController from './PostComment/controller/postComment.controller'
import ImageController from './Image/image.controller'
import QuestionsController from './Question/controller/question.controller'
import AnswersController from './Answer/controller/answer.controller'
import ReviewController from './Review/controller/review.controller'
import BootcampController from './Bootcamp/controller/bootcamp.controller'
import CommunityController from './Community/controller/community.controller'
import CommunityCommentController from './CommunityComment/controller/communityComment.controller'

new App([
  new AuthController(),
  new UsersController(),
  new PostsController(),
  new PostCommentsController(),
  new QuestionsController(),
  new AnswersController(),
  new BootcampController(),
  new CommunityController(),
  new CommunityCommentController(),
  new ReviewController(),
  new ImageController()
])
