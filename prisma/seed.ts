import { Bootcamp, PrismaClient } from '@prisma/client'
import { bootcamps } from './bootcamps'

const prisma = new PrismaClient()

export async function seed() {
  for (let bootcamp of bootcamps) {
    await prisma.bootcamp.create({
      data: bootcamp as Bootcamp
    })
  }
}

seed()
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
