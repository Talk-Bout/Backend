import { prisma } from '../../Infrastructures/utils/prisma'
import communityIdValidator from '../validators/communityId.validator'

export default async function (DTO: communityIdValidator) {
  const Community = prisma.community
  return Community.delete({ where: DTO })
}
