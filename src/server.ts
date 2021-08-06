import App from './Infrastructures/app'
import UsersController from './User/controller/users.controller'
import AuthController from './Auth/controller/auth.controller'
import PostsController from './Post/controller/posts.controller'
import CommentsController from './Comment/controller/comment.controller'
import ImageController from './Image/image.controller'
import BookmarksController from './Bookmark/controller/bookmarks.controller'
import PostLikeController from './postLike/controller/postLikes.controller'
import BootcampController from './Bootcamp/controller/bootcamp.controller'

new App([
  new UsersController(),
  new AuthController(),
  new PostsController(),
  new CommentsController(),
  new ImageController(),
  new BookmarksController(),
  new PostLikeController(),
  new BootcampController()
])
