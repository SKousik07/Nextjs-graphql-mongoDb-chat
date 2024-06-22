import { User } from "../models"


const findUserByEmail = async (email: string) => {
    return await User.findOne({ email })
}

const createUser = async (input: any) => {
    const newUser = await new User(input)
    return newUser.save()
}

export { 
    findUserByEmail,
    createUser 
}
