import jwt from "jsonwebtoken";

const getDataFromToken = (token: string) => {
  try {
    const decodedToken = jwt.decode(token);
    console.log("decodedToken2", decodedToken);
    return decodedToken;
  } catch (error) {
    console.log("Token verification failed", error);
  }
};

export default getDataFromToken;
