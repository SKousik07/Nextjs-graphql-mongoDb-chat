import connect from "@/lib/dbconfig";
import { ApolloServer } from "@apollo/server";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest, NextResponse } from "next/server";


connect()

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context:  async ( req, res) => {
        const token = await req.cookies.get('token') || ''
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
        console.log("res",res)
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
