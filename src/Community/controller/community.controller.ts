import { Controller } from '../../Infrastructures/interfaces'
import { Router, Request, Response, NextFunction } from 'express'
import prismaException from '../../Infrastructures/utils/prismaException'
import { validate } from '../../Infrastructures/middlewares'
import {
  createCommunity,
  readCommunity,
  updateCommunity,
  deleteCommunity,
  detailCommunity,
  createCommunityBookmark,
  createCommunityLike,
  deleteCommunityBookmark,
  deleteCommunityLike
} from '../services'
import {
  CreateCommunityValidator,
  CreateCommunityJunctionValidator,
  UpdateCommunityValidator
} from '../validators'
import moment from '../../Infrastructures/utils/moment'

export default class BootcampController implements Controller {
  public readonly router = Router()
  public readonly path = '/api/bootcamp/:bootcampName/community'
  public readonly communityLikePath = '/api/community/:communityId/communityLikes'
  public readonly communityBookmarkPath = '/api/community/:communityId/communityBookmarks'

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router
      .route(this.path)
      .get(this.getCommunity)
      .post(validate(CreateCommunityValidator), this.postCommunity)

    this.router
      .route(this.path + '/:communityId')
      .get(this.detailCommunity)
      .patch(validate(UpdateCommunityValidator), this.patchCommunity)
      .delete(this.deleteCommunity)

    this.router
      .route(this.communityLikePath)
      .post(validate(CreateCommunityJunctionValidator), this.postCommunityLike)
    this.router
      .route(this.communityLikePath + '/:communityLikeId')
      .delete(this.deleteCommunityLike)

    this.router
      .route(this.communityBookmarkPath)
      .post(validate(CreateCommunityJunctionValidator), this.postCommunityBookmark)
    this.router
      .route(this.communityBookmarkPath + '/:communityBookmarkId')
      .delete(this.deleteCommunityBookmark)
  }

  private getCommunity(req: Request, res: Response, next: NextFunction) {
    const bootcampName: string = req.params.bootcampName
    const page: number = Number(req.query.page)

    return readCommunity(bootcampName, page)
      .then((communities) => res.status(200).json(communities))
      .catch((err) => prismaException(err, next))
  }

  private detailCommunity(req: Request, res: Response, next: NextFunction) {
    const communityId: number = Number(req.params.communityId)

    return detailCommunity(communityId)
      .then((community) => res.status(200).json(community))
      .catch((err) => prismaException(err, next))
  }

  private postCommunity(req: Request, res: Response, next: NextFunction) {
    const createDTO: CreateCommunityValidator = {
      nickname: req.body.nickname,
      bootcampName: req.body.bootcampName,
      title: req.body.title,
      content: req.body.content,
      image: req.body.image || null
    }

    return createCommunity(createDTO)
      .then((community) => res.status(200).json(community))
      .catch((err) => prismaException(err, next))
  }

  private patchCommunity(req: Request, res: Response, next: NextFunction) {
    const communityId: number = Number(req.params.communityId)
    const updateCommunityDTO: UpdateCommunityValidator = {
      title: req.body.title,
      content: req.body.content,
      image: req.body.image || null
    }

    return updateCommunity(communityId, updateCommunityDTO)
      .then((community) => res.status(200).json(community))
      .catch((err) => prismaException(err, next))
  }

  private deleteCommunity(req: Request, res: Response, next: NextFunction) {
    const communityId: number = Number(req.params.communityId)

    return deleteCommunity(communityId)
      .then(() => res.status(200).json({ isDeleted: true }))
      .catch((err) => prismaException(err, next))
  }

  private postCommunityLike(req: Request, res: Response, next: NextFunction) {
    const DTO: CreateCommunityJunctionValidator = {
      communityId: req.body.communityId,
      nickname: req.body.nickname
    }

    return createCommunityLike(DTO)
      .then((like) => res.status(200).json(like))
      .catch((err) => prismaException(err, next))
  }

  private deleteCommunityLike(req: Request, res: Response, next: NextFunction) {
    const communityLikeId: number = Number(req.params.communityLikeId)

    return deleteCommunityLike(communityLikeId)
      .then(() => res.status(200).json({ isDeleted: true }))
      .catch((err) => prismaException(err, next))
  }

  private postCommunityBookmark(req: Request, res: Response, next: NextFunction) {
    const createDTO: CreateCommunityJunctionValidator = {
      nickname: req.body.nickname,
      communityId: req.body.communityId
    }

    return createCommunityBookmark(createDTO)
      .then((bookmark) => res.status(201).json(bookmark))
      .catch((err) => prismaException(err, next))
  }

  private deleteCommunityBookmark(req: Request, res: Response, next: NextFunction) {
    const communityBookmarkId: number = Number(req.params.communityBookmarkId)

    return deleteCommunityBookmark(communityBookmarkId)
      .then(() => res.status(200).json({ isDeleted: true }))
      .catch((err) => prismaException(err, next))
  }
}
