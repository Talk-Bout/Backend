import { prisma } from '../../Infrastructures/utils/prisma'
import { NicknameValidator } from '../validators'

export default (nickname: NicknameValidator) => {
  const CommunityBookmark = prisma.communityBookmark
  return CommunityBookmark.findMany({ where: nickname })
}