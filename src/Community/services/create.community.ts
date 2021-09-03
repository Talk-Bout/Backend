import { Community } from '@prisma/client'
import moment from '../../Infrastructures/utils/moment'
import { prisma } from '../../Infrastructures/utils/prisma'
import { CreateCommunityValidator } from '../validators'

export default async function (DTO: CreateCommunityValidator) {
  const Community = prisma.community

  type CommunityDTO = Omit<Community, 'createdAt'> & {
    createdAt: Date | string
  }

  const community: CommunityDTO = await Community.create({ data: DTO }).catch(
    (e) => {
      throw e
    }
  )

  community.createdAt = moment(community.createdAt as Date)

  return community
}
