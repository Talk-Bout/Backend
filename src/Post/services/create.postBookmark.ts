import { prisma } from '../../Infrastructures/utils/prisma'
import { CreatePostJunctionValidator } from '../validators'

export default (DTO: CreatePostJunctionValidator) => {
  const PostBookmark = prisma.postBookmark
  return PostBookmark.create({ data: DTO })
}