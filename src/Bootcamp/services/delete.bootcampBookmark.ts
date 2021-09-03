import { prisma } from '../../Infrastructures/utils/prisma'
import { BootcampJunctionValidator } from '../validators'

export default (requestObject: BootcampJunctionValidator) => {
  const BootcampBookmark = prisma.bootcampBookmark
  return BootcampBookmark.delete({
    where: {
      bootcampName_nickname: requestObject
    }
  })
}
