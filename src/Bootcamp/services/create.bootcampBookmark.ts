import { prisma } from '../../Infrastructures/utils/prisma'
import { CreateBootcampJunctionValidator } from '../validators'

export default (DTO: CreateBootcampJunctionValidator) => {
  const Bookmark = prisma.bootcampBookmark
  return Bookmark.create({ data: DTO })
}
