"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./Infrastructures/app"));
const users_controller_1 = __importDefault(require("./User/controller/users.controller"));
const auth_controller_1 = __importDefault(require("./Auth/controller/auth.controller"));
const posts_controller_1 = __importDefault(require("./Post/controller/posts.controller"));
const comment_controller_1 = __importDefault(require("./Comment/controller/comment.controller"));
const image_controller_1 = __importDefault(require("./Image/image.controller"));
const bookmarks_controller_1 = __importDefault(require("./Bookmark/controller/bookmarks.controller"));
const postLikes_controller_1 = __importDefault(require("./postLike/controller/postLikes.controller"));
const bootcamp_controller_1 = __importDefault(require("./Bootcamp/controller/bootcamp.controller"));
new app_1.default([
    new users_controller_1.default(),
    new auth_controller_1.default(),
    new posts_controller_1.default(),
    new comment_controller_1.default(),
    new image_controller_1.default(),
    new bookmarks_controller_1.default(),
    new postLikes_controller_1.default(),
    new bootcamp_controller_1.default()
]);
