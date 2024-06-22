import { createToken, hashPassword, validatePassword } from "../services/authService"
import { createUser, findUserByEmail } from "../services/userService"

const authResolver = { 
    Query: {
        user : () => {
            return "Hello, user!"
        }
    },
    Mutation: {
        signup : async (root: any, { email, password, username }: any, context: any) => {
            try {
                //check user already exists
                const existingUser = await findUserByEmail(email)
                if(existingUser){
                    throw new Error("User already exists");
                }
                //hash password
                const hashedPassword = await hashPassword(password)
                //create user
                const newUser = {
                    username,
                    email,
                    password: hashedPassword
                }
                const savedUser = await createUser(newUser)
                console.log("savedUser",savedUser);
                return {
                    message: "User created successfully",
                    success: true,
                    user: savedUser
                }
            } catch (error:any) {
                return {
                    message: error.message
                }
            }
        },

        login : async (root:any, { email, password }: any, context: any) => {
            try {
                console.log("context",context)
                //check user exists or not
                const existingUser = await findUserByEmail(email)
                if(!existingUser){
                    throw new Error("User does not exist");
                }
                //validate the passwords
                const isValid = await validatePassword(password, existingUser.password)
                if(!isValid){
                    throw new Error("Invalid password");
                }
                console.log("existingUser",existingUser)
                //create token
                const tokenData = {
                    id: existingUser._id,
                    username: existingUser.username,
                    email: existingUser.email
                }
                const token = await createToken(tokenData)

                // res.cookie(
                //     'token',
                //     token,
                //     {
                //         httpOnly: true,
                //         secure: process.env.NODE_ENV !== 'development'
                //     }
                // )
                return {
                    message: "Login successful",
                    success: true,
                    user: existingUser
                }
                
            } catch (error:any) {
                return {
                    message: error.message
                }
            }
        }
    }
}

export default authResolver