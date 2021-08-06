import { prisma } from '../../Infrastructures/utils/prisma'

export default () => {
  const Community = prisma.community
  return Community.findMany({})
}
