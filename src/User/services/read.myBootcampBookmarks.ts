import { prisma } from '../../Infrastructures/utils/prisma'
import { NicknameValidator } from '../validators'

export default (nickname: NicknameValidator) => {
  const BootcampBookmark = prisma.bootcampBookmark
  return BootcampBookmark.findMany({ where: nickname })
}