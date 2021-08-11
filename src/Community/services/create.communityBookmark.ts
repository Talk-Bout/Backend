import { prisma } from '../../Infrastructures/utils/prisma'
import { CreateCommunityJunctionValidator } from '../validators'

export default (DTO: CreateCommunityJunctionValidator) => {
  const Bookmark = prisma.communityBookmark
  return Bookmark.create({ data: DTO })
}
