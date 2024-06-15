import connect from "@/lib/dbconfig";
import { ApolloServer } from "@apollo/server";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";


connect()

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context:  async ( req, res) => {
        const token = req.cookies.get('token') || ''
        let user = null;
        console.log("token",token)
        if (token) {
          try {
            //verify token and get user
           console.log("token",token)
          } catch (error) {
            console.error('Invalid token', error);
          }
        }
    
        return { req, res, user };
      },
  });

  export async function GET(request: NextRequest) {
    return handler(request);
  }
  export async function POST(request: NextRequest) {
    return handler(request);
  }
