import { prisma } from '../../Infrastructures/utils/prisma'
import loginValidator from '../validators/login.validator'
import { compareHash } from '../../Infrastructures/utils/bcrypy'

export  default async(DTO: loginValidator) => {
  const User = prisma.user
  const user = await User.findFirst({ where: {
    email: DTO.email
  } })

  if (user){
    if(compareHash( DTO.password, user.password)){
      return user 
    }else{
      throw new Error("wrong password")
    }

  }else if (!user){
    throw new Error ( "User not found")
  }
}


