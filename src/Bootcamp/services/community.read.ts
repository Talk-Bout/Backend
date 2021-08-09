import { Community } from '@prisma/client'
import { prisma } from '../../Infrastructures/utils/prisma'
import BootcampNameValidator from '../validators/bootcampName.validator'

export default async (DTO: BootcampNameValidator) => {
  const Community = prisma.community
  return Community.findMany({
    where: DTO,
    include: {
      communityLike: true,
      communityComment: true
    }
  })
}
