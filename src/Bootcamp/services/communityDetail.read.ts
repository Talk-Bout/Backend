import { prisma } from '../../Infrastructures/utils/prisma'
import readCommunityDetailValidator from '../validators/readCommunityDetail.validator'

export default (DTO: readCommunityDetailValidator) => {
  const Community = prisma.community
  return Community.findUnique({ where: DTO })
}
