const express = require("express");
const { createServer } = require("http");
const { makeExecutableSchema } = require("@graphql-tools/schema");
// const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { useServer } = require('graphql-ws/lib/use/ws');
// const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const cors = require("cors")
const { WebSocketServer } = require('ws');
const bodyParser =require("body-parser"); 
const { startStandaloneServer } = require('@apollo/server/standalone');


const {
  ApolloServerPluginDrainHttpServer,
} = require("apollo-server-core");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { ApolloServer, graphqlExpress, graphiqlExpress  } = require("apollo-server-express");


(async function () {
  const app = express();
  const httpServer = createServer(app);
  const PORT = 4000;

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: "/graphql" }
  );

  const server = new ApolloServer({
    schema,
    context: ({req}) => {
        const token = req.headers.authorization.split(" ")[1] || ""

        return { token }
    },
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await server.start();
  server.applyMiddleware({ app });

  httpServer.listen(PORT, () => {
    console.log(`Server start on port: ${PORT}`);
  });
})();



// async function start() {

//     const app = express();
//     const httpServer = createServer(app);
//     const PORT = 4000;

//     const schema = makeExecutableSchema({
//         typeDefs,
//         resolvers,
//         context: ({req}) => {
//           const token = req.headers.authorization || '';
//           return { token };
//         }
//     })

//     const wsServer = new WebSocketServer({
//         server: httpServer,
//         path: "/graphql"
//     })
//     const serverCleanup = useServer({ schema }, wsServer)

//     const server = new ApolloServer({
//         schema,
//         context: async ({ req, connection }) => {
//           if (connection) {
//             console.log("connection", connection);
//             return connection.context;
//           } else {
//             console.log("request", req);
//             const token = req.headers.authorization || "";

//             return { token };
//           }
//         },
//         plugins: [
//           ApolloServerPluginDrainHttpServer({ httpServer }),
//           {
//               async serverWillStart() {
//                   return {
//                       async drainServer() {
//                           await serverCleanup.dispose();
//                       },
//                   };
//               },
//           },
//       ],
//     })

//     // const { url } = await startStandaloneServer(server, {
//     //     context: async ({ req, res }) => {
//     //         const token = req.headers.authorization || '';
//     //         return { token };
//     //     },
//     // });

//     await server.start()
//     app.use(
//         cors(),
//         bodyParser.json(),
//         expressMiddleware(server),
//     );
//     // console.log(`🚀 Server listening at: ${url}`);

//     httpServer.listen(PORT, () => {
//         console.log(`Server start on port: ${PORT}`);
//     })
// }

// start()