// import connect from "@/lib/dbconfig";
// import { ApolloServer } from "@apollo/server";
// import resolvers from "./resolvers";
// import typeDefs from "./typeDefs";
// import { startServerAndCreateNextHandler } from "@as-integrations/next";
// import { NextRequest, NextResponse } from "next/server";
// import { verifyToken } from "./services/authService";
// import { PubSub } from "graphql-subscriptions";
// import { createServer } from "http";
// import { WebSocketServer } from "ws";

// connect()

// const pubsub = new PubSub();

// const server = new ApolloServer({
//     typeDefs,
//     resolvers
// })

// const handler = startServerAndCreateNextHandler<NextRequest>(server, {
//     context:  async ( req, res) => {
//         const authToken = req.headers.get("authorization") || '';
//         let user = null;
//         console.log("authToken",authToken)
//         if (authToken) {
//           try {
//            user = verifyToken(authToken.replace('Bearer ', ''));
//            console.log("userFromToken",user)
//           } catch (error) {
//             console.error('Invalid token', error);
//           }
//         }
        
//         return { req: req , res: res, user: user, pubSub: pubsub };
//       },
//   });

//   export async function GET(request: NextRequest) {
//     const hand = handler(request)
//     console.log("handresp_GET",hand)
//   }
//   export async function POST(request: NextRequest) {
//     const hand = await handler(request)
//     console.log("handresp_POST",hand)
//     return hand;
//   }


import { ApolloServer } from '@apollo/server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import { PubSub } from 'graphql-subscriptions';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import connect from '@/lib/dbconfig';
import { verifyToken } from './services/authService';
import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';

connect();

const pubsub = new PubSub();
const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  plugins: [],
});

const createContext = async (req: NextRequest, res: any) => {
  console.log("req.headers",req.headers)
  const authToken = req.headers.get('authorization') || '';
  let user = null;
  if (authToken) {
    try {
      user = verifyToken(authToken.replace('Bearer ', ''));
    } catch (error) {
      console.error('Invalid token', error);
    }
  }
  return { req, res, user, pubsub };
};

let handler: any;
let isServerStarted = false;

const startApolloServer = async () => {
  if (isServerStarted) {
    console.log('Server already started');
    return;
  }

  await server.start();

  const httpServer = createServer(async (req, res) => {
    if (!handler) {
      handler = startServerAndCreateNextHandler<NextRequest>(server, {
        context: (req, res) => createContext(req, res),
      });
    }

    handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);
  });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/api/graphql',
  });

  useServer(
    {
      schema,
      context: async (ctx) => {
        const authToken: any = ctx.connectionParams?.authToken || '';
        let user = null;
        if (authToken) {
          try {
            user = verifyToken(authToken.replace('Bearer ', ''));
          } catch (error) {
            console.error('Invalid token', error);
          }
        }
        return { user, pubsub };
      },
    },
    wsServer
  );

  const PORT = 4000; // Use a different port if needed
  httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    isServerStarted = true;
  });

  return { httpServer, wsServer };
};

startApolloServer().catch((err) => {
  console.error('Error starting Apollo Server:', err);
});

export async function GET(request: NextRequest) {
  if (!handler) {
    handler = startServerAndCreateNextHandler<NextRequest>(server, {
      context: async (req, res) => createContext(req, res),
    });
  }
  return handler(request);
}

export async function POST(request: NextRequest) {
  if (!handler) {
    handler = startServerAndCreateNextHandler<NextRequest>(server, {
      context: async (req, res) => createContext(req, res),
    });
  }
  return handler(request);
}
