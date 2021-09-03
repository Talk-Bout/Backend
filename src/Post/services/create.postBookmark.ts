import { prisma } from '../../Infrastructures/utils/prisma'
import { PostJunctionValidator } from '../validators'

export default (requestObject: PostJunctionValidator) => {
  const PostBookmark = prisma.postBookmark
  return PostBookmark.create({ data: requestObject })
}
