import * as passport from 'passport'
import * as passportLocal from 'passport-local'
import { prisma } from '../utils/prisma'
import loginValidator from '../../Auth/validators/login.validator'
import { compareHash } from '../../Infrastructures/utils/bcrypy'
import deleteBookmarkValidator from '../../Bookmark/validators/deleteBookmark.validator'

// email = req.body.email
// password = req.body.password
const User = prisma.user
 

passport.use(new passportLocal.Strategy({
   usernameField:'email'
 },async(email,password, done)=>{

    try {
        
     const userFound = await User.findFirst({
         where:{email}
     })

     if (userFound && compareHash(password, userFound.password)){
         done(null, userFound)
     }else{
         done(null,false)
     }


    } catch (error) {
        
    }
}))
  
   
