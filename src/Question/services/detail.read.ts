import { prisma } from '../../Infrastructures/utils/prisma'
import readDetailValidator from '../validators/readDetail.validator'

export default (DTO: readDetailValidator) => {
  const Detail = prisma.question
  return Detail.findUnique({ where: DTO })
}
