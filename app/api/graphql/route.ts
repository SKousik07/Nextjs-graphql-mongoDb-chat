// import { ApolloServer } from "@apollo/server";
// import { makeExecutableSchema } from "@graphql-tools/schema";
// import { createServer } from "http";
// import { WebSocketServer } from "ws";
// import { useServer } from "graphql-ws/lib/use/ws";
// import typeDefs from "./typeDefs";
// import resolvers from "./resolvers";
// import { PubSub } from "graphql-subscriptions";
// import connect from "@/lib/dbconfig";
// import { verifyToken } from "./services/authService";
// import { NextRequest, NextResponse } from "next/server";

// // Connect to the database
// connect();

// const pubsub = new PubSub();
// const schema = makeExecutableSchema({ typeDefs, resolvers });

// const server = new ApolloServer({
//   schema,
//   plugins: [],
// });

// // Create a context for each request
// const createContext = async (req: NextRequest) => {
//   const authToken = req.headers.get("authorization") || "";
//   let user = null;
//   if (authToken) {
//     try {
//       user = verifyToken(authToken.replace("Bearer ", ""));
//     } catch (error) {
//       console.error("Invalid token", error);
//     }
//   }
//   return { req, user, pubsub };
// };

// // Start Apollo Server
// const startApolloServer = async () => {
//   await server.start();

//   const httpServer = createServer(async (req, res) => {
//     if (req.url?.startsWith("/api/graphql")) {
//       // Create context and handle GraphQL requests
//       const context = await createContext(req);
//       const result = await server.executeOperation({
//         query: req.body,
//         contextValue: context,
//       });
//       res.writeHead(result.http.status, { "Content-Type": "application/json" });
//       res.end(JSON.stringify(result));
//     } else {
//       res.statusCode = 404;
//       res.end("Not Found");
//     }
//   });

//   const wsServer = new WebSocketServer({
//     server: httpServer,
//     path: "/api/graphql",
//   });

//   useServer(
//     {
//       schema,
//       context: async (ctx) => {
//         const authToken = ctx.connectionParams?.authToken || "";
//         let user = null;
//         if (authToken) {
//           try {
//           } catch (error) {
//             console.error("Invalid token", error);
//           }
//         }
//         return { user, pubsub };
//       },
//     },
//     wsServer
//   );

//   const PORT = 4000; // Change port if necessary
//   httpServer.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//   });
// };

// startApolloServer().catch((err) => {
//   console.error("Error starting Apollo Server:", err);
// });

// export async function GET(request: NextRequest) {
//   if (request.url?.startsWith("/api/graphql")) {
//     const context = await createContext(request);
//     // Handle GraphQL queries here
//     // Example using server.executeOperation
//     const result = await server.executeOperation({
//       query: request.body,
//       contextValue: context,
//     });
//     return new NextResponse(JSON.stringify(result), {
//       status: result.http.status,
//       headers: { "Content-Type": "application/json" },
//     });
//   } else {
//     return new NextResponse("Not Found", { status: 404 });
//   }
// }

// export async function POST(request: NextRequest) {
//   if (request.url?.startsWith("/api/graphql")) {
//     const context = await createContext(request);
//     // Handle GraphQL mutations here
//     const result = await server.executeOperation({
//       query: request.body,
//       contextValue: context,
//     });
//     return new NextResponse(JSON.stringify(result), {
//       status: result.http.status,
//       headers: { "Content-Type": "application/json" },
//     });
//   } else {
//     return new NextResponse("Not Found", { status: 404 });
//   }
// }
