import { prisma } from '../../Infrastructures/utils/prisma'
import { NicknameValidator } from '../validators'

export default (nickname: NicknameValidator) => {
  const PostBookmark = prisma.postBookmark
  return PostBookmark.findMany({ where: nickname })
}
