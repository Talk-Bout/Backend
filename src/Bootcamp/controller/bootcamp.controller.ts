import Controller from '../../Infrastructures/interfaces/controller.interface'
import { Router, Request, Response, NextFunction } from 'express'
import PromiseRejectionException from '../../Infrastructures/exceptions/PromiseRejection.exception'
import readBootcamp from '../services/bootcamp.read'
import readReview from '../services/review.read'
import createReview from '../services/review.create'
import createReviewValidator from '../validators/createReview.validator'
import readReviewValidator from '../validators/readReview.validator'
import readCommunityDetailValidator from '../validators/communityId.validator'
import readCommunity from '../services/community.read'
import readCommunityDetail from '../services/communityDetail.read'
import createCommunityValidator from '../validators/createCommunity.validator'
import communityIdValidator from '../validators/communityId.validator'
import bootcampNameValidator from '../validators/bootcampName.validator'
import createCommunity from '../services/community.create'
import UpdateCommunityValidator from '../validators/updateCommunity.validator'
import updateCommunity from '../services/community.update'
import deleteCommunity from '../services/community.delete'
import createCommentValidator from '../validators/createComment.validator'
import createComment from '../services/comment.create'
import CommunityIdValidator from '../validators/communityId.validator'
import CommentIdValidator from '../validators/commentId.validator'
import readComment from '../services/comment.read'
import UpdateCommentValidator from '../validators/updateComment.validator'
import deleteComment from '../services/comment.delete'
import updateComment from '../services/comment.update'
import CreateLikeValidator from '../validators/createLike.validator'
import CommunityLikeIdValidator from '../validators/communityLikeId.validator'
import createLike from '../services/like.create'
import deleteLike from '../services/like.delete'
import validate from '../../Infrastructures/middlewares/validation.middleware'
import CreateBookmark from '../services/bookmark.create'
import DeleteBookmark from '../services/bookmark.delete'
import bookmarkCreateValidator from '../validators/createBookmark.validator'
import bookmarkdeleteValidator from '../validators/deleteBookmark.validator'

export default class BootcampController implements Controller {
  public readonly path = '/bootcamp'
  public readonly reviewPath = '/bootcamp/:bootcampName/reviews'
  public readonly communityPath = '/bootcamp/:bootcampName/community'
  public readonly communityCommentPath =
    '/bootcamp/:bootcampName/community/:communityId/comments'
  public readonly communityLikePath =
    '/bootcamp/:bootcampName/community/:communityId/likes'
  public readonly communityBookmarkPath =
    '/bootcamp/:bootcampName/community/:communityId/bookmarks'
  public readonly router = Router({ mergeParams: true })
  public readonly bootcampBookmarkPath = '/bootcamp/:bootcampName/bookmarks'

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.route(this.path).get(this.getBootcamp)

    this.router.route(this.reviewPath).get(this.getReview).post(this.postReview)

    this.router
      .route(this.communityPath)
      .get(this.getCommunity)
      .post(validate(createCommunityValidator), this.postCommunity)

    this.router
      .route(this.communityPath + '/:communityId')
      .get(this.getCommunityDetail) // w/o validator
      .patch(validate(UpdateCommunityValidator), this.patchCommunity)
      .delete(this.deleteCommunity)

    this.router
      .route(this.communityCommentPath)
      .get(this.getComment)
      .post(validate(createCommentValidator), this.postComment)

    this.router
      .route(this.communityCommentPath + '/:communityCommentId')
      .patch(validate(UpdateCommentValidator), this.patchComment)
      .delete(this.deleteComment)

    this.router
      .route(this.communityLikePath)
      .post(validate(CreateLikeValidator), this.postCommunityLike)

    this.router
      .route(this.communityLikePath + '/:communityLikeId')
      .delete(this.deleteCommunityLike)

    this.router
      .route(this.communityBookmarkPath + '/:communityBookmarkId')

    this.router
      .route(this.bootcampBookmarkPath)
      .post(this.createBootcampBookmark)
      .delete(this.deleteBootcampBookmark)
  }

  private createBootcampBookmark(req: Request, res: Response, next: NextFunction) {
    const createDTO: bookmarkCreateValidator = {
      nickname: req.body.nickname,
      bootcampName: req.body.bootcampName
    }

    return CreateBookmark(createDTO)
      .then(() => res.status(201).json({ isCreated: true }))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private deleteBootcampBookmark(req: Request, res: Response, next: NextFunction) {
    const deleteDTO: bookmarkdeleteValidator = {
      bootcampBookmarkId: Number(req.params.bootcampBookmarkId)
    }

    return DeleteBookmark(deleteDTO)
      .then(() => res.status(200).json({ isDeleted: true }))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private getBootcamp(req: Request, res: Response, next: NextFunction) {
    return readBootcamp()
      .then((bootcampList) => res.status(200).json(bootcampList))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private getReview(req: Request, res: Response, next: NextFunction) {
    const readReviewDTO: readReviewValidator = {
      bootcampName: req.body.bootcampName
    }

    return readReview(readReviewDTO)
      .then((reviews) => res.status(200).json(reviews))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private postReview(req: Request, res: Response, next: NextFunction) {
    const createReviewDTO: createReviewValidator = {
      nickname: req.body.nickname,
      bootcampName: req.body.bootcampName,
      status: req.body.status, // 수강중 or 수료
      pros: req.body.pros,
      cons: req.body.cons,
      stars: req.body.stars
    }

    return createReview(createReviewDTO)
      .then(() => res.status(201).json({ isCreated: true }))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private getCommunity(req: Request, res: Response, next: NextFunction) {
    const readCommunityDTO: bootcampNameValidator = {
      bootcampName: String(req.params.bootcampName)
    }

    return readCommunity(readCommunityDTO)
      .then((communities) => res.status(200).json(communities))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private getCommunityDetail(req: Request, res: Response, next: NextFunction) {
    const readDetailDTO: readCommunityDetailValidator = {
      communityId: Number(req.params.communityId)
    }

    return readCommunityDetail(readDetailDTO)
      .then((community) => res.status(200).json(community))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private postCommunity(req: Request, res: Response, next: NextFunction) {
    const createDTO: createCommunityValidator = {
      nickname: req.body.nickname,
      bootcampName: req.body.bootcampName,
      title: req.body.title,
      content: req.body.content
    }

    return createCommunity(createDTO)
      .then(() => res.status(200).json({ isCreated: true }))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private patchCommunity(req: Request, res: Response, next: NextFunction) {
    const communityId: communityIdValidator = {
      communityId: Number(req.params.communityId)
    }
    const updateDTO: UpdateCommunityValidator = {
      title: req.body.title,
      content: req.body.content
    }

    return updateCommunity(communityId, updateDTO)
      .then(() => res.status(200).json({ isUpdated: true }))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private deleteCommunity(req: Request, res: Response, next: NextFunction) {
    const communityId: communityIdValidator = {
      communityId: Number(req.params.communityId)
    }

    return deleteCommunity(communityId)
      .then(() => res.status(200).json({ isDeleted: true }))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private postComment(req: Request, res: Response, next: NextFunction) {
    const DTO: createCommentValidator = {
      content: req.body.content,
      nickname: req.body.nickname,
      communityId: req.body.communityId
    }

    return createComment(DTO)
      .then(() => res.status(200).json({ isCreated: true }))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private getComment(req: Request, res: Response, next: NextFunction) {
    const DTO: CommunityIdValidator = {
      communityId: Number(req.params.communityId)
    }

    return readComment(DTO)
      .then((comments) => res.status(200).json(comments))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private patchComment(req: Request, res: Response, next: NextFunction) {
    const commentId: CommentIdValidator = {
      communityCommentId: Number(req.params.communityCommentId)
    }
    const DTO: UpdateCommentValidator = {
      content: req.body.content
    }

    return updateComment(commentId, DTO)
      .then(() => res.status(200).json({ isUpdated: true }))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private deleteComment(req: Request, res: Response, next: NextFunction) {
    const commentId: CommentIdValidator = {
      communityCommentId: Number(req.params.communityCommentId)
    }

    return deleteComment(commentId)
      .then(() => res.status(200).json({ isDeleted: true }))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private postCommunityLike(req: Request, res: Response, next: NextFunction) {
    const DTO: CreateLikeValidator = {
      communityId: req.body.communityId,
      nickname: req.body.nickname
    }

    return createLike(DTO)
      .then(() => res.status(200).json({ isCreated: true }))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }

  private deleteCommunityLike(req: Request, res: Response, next: NextFunction) {
    const DTO: CommunityLikeIdValidator = {
      communityLikeId: Number(req.params.communityLikeId)
    }

    return deleteLike(DTO)
      .then(() => res.status(200).json({ isDeleted: true }))
      .catch((err) => {
        console.error(err)
        next(new PromiseRejectionException())
      })
  }
}
