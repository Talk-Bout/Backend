import App from './app'
import UsersController from './users/users.controller'
import PostsController from './posts/posts.controller'
new App([new UsersController(),new PostsController()])
