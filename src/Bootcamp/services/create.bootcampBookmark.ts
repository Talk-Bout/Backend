import { prisma } from '../../Infrastructures/utils/prisma'
import { BootcampJunctionValidator } from '../validators'

export default (requestObject: BootcampJunctionValidator) => {
  const Bookmark = prisma.bootcampBookmark
  return Bookmark.create({ data: requestObject })
}
