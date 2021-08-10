import { prisma } from '../../Infrastructures/utils/prisma'
import CommunityIdValidator from '../validators/communityId.validator'

export default (DTO: CommunityIdValidator) => {
  const CommunityComment = prisma.communityComment
  return CommunityComment.findMany({ where: DTO })
}
