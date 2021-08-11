import { prisma } from '../../Infrastructures/utils/prisma'

export default (bootcampBookmarkId: number) => {
  const BootcampBookmark = prisma.bootcampBookmark
  return BootcampBookmark.delete({ where: { bootcampBookmarkId }})
}
