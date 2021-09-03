import { prisma } from '../../Infrastructures/utils/prisma'
import { PostJunctionValidator } from '../validators'

export default (requestObject: PostJunctionValidator) => {
  const PostLike = prisma.postLike
  return PostLike.create({ data: requestObject })
}
