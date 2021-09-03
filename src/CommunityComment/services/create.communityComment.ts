import { CommunityComment } from '@prisma/client'
import moment from '../../Infrastructures/utils/moment'
import { prisma } from '../../Infrastructures/utils/prisma'
import { CreateCommunityCommentValidator } from '../validators'

export default async function (DTO: CreateCommunityCommentValidator) {
  const CommunityComment = prisma.communityComment

  type CommunityCommentDTO = Omit<CommunityComment, 'createdAt'> & {
    createdAt: Date | string
  }

  const communityComment: CommunityCommentDTO = await CommunityComment.create({ data: DTO })

  communityComment.createdAt = moment(communityComment.createdAt as Date)

  return communityComment
}
