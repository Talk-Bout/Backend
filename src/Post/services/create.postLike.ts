import { prisma } from '../../Infrastructures/utils/prisma'
import { CreatePostJunctionValidator } from '../validators'

export default (DTO: CreatePostJunctionValidator) => {
  const PostLike = prisma.postLike
  return PostLike.create({ data: DTO })
}