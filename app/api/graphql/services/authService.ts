import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const hashPassword = async (password: string) => {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    return hashedPassword
}

const validatePassword = async (inputPassword: string, storedPassword: string) => {
    return await bcryptjs.compare(inputPassword, storedPassword)
}

const createToken = async (tokenData : any) => {
    return await jwt.sign(tokenData, process.env.TOKEN_SECRET!,
        {expiresIn: "1d"})
}

export { hashPassword, validatePassword, createToken}
