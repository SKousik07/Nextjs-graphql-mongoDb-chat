import connect from "@/lib/dbconfig";
import { ApolloServer } from "@apollo/server";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./services/authService";


connect()

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context:  async ( req, res) => {
        const authToken = req.headers.get("authorization") || '';
        let user = null;
        console.log("authToken",authToken)
        if (authToken) {
          try {
           user = verifyToken(authToken.replace('Bearer ', ''));
           console.log("userFromToken",user)
          } catch (error) {
            console.error('Invalid token', error);
          }
        }
        return { req: req , res: res, user: user };
      },
  });

  export async function GET(request: NextRequest) {
    const hand = handler(request)
    console.log("handresp_GET",hand)
  }
  export async function POST(request: NextRequest) {
    const hand = await handler(request)
    console.log("handresp_POST",hand)
    return hand;
  }
