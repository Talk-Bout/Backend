import { prisma } from '../../Infrastructures/utils/prisma'
import readCommunityDetailValidator from '../validators/communityId.validator'

export default (DTO: readCommunityDetailValidator) => {
  const Community = prisma.community
  return Community.update({
    where: DTO,
    data: {
      viewCount: {
        increment: 1
      }
    },
    include: {
      communityLike: true,
      communityComment: true
    }
  })
}
