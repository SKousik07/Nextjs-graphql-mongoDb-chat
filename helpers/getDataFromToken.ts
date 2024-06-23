import jwt from "jsonwebtoken"

const getDataFromToken = (token: string) => {
    try {
        const decodedToken =  jwt.decode(token)
        console.log("decodedToken", decodedToken)
        return decodedToken
    }
    catch (error) {
        console.log(error)
    }
}

export default getDataFromToken

