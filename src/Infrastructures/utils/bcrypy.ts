import * as bcrypt from 'bcrypt'

export  function generateHash (password:string){
    const salt =  bcrypt.genSaltSync(12);
    const hash =  bcrypt.hashSync(password, salt)
    return hash
}

export function compareHash (password:string, hashed:string){
    return bcrypt.compareSync(password,hashed)
}

// const a = "1q2w3e4r"
// const b = "1q2w3e4r"

// const ah= generateHash(a)
// generateHash(b)

// console.log(compareHash("1q2w3e4r",ah))
//console.log(compareHash("1q2w3e4r", "$2b$12$26CTf6RN8twMcBPABU1Ni.SeEx6cc1ajeL/X6iZ/0vY2DJSHi.Qcu")) 