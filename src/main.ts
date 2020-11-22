// import express from 'express';
// import { ApolloServer, gql } from 'apollo-server-express';
// import { resolvers } from './resolvers';
// import { typeDefs } from './schema';
// import { getUser } from './auth';

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ req }) => {
//     // Note! This example uses the `req` object to access headers,
//     // but the arguments received by `context` vary by integration.
//     // This means they will vary for Express, Koa, Lambda, etc.!
//     //
//     // To find out the correct arguments for a specific integration,
//     // see the `context` option in the API reference for `apollo-server`:
//     // https://www.apollographql.com/docs/apollo-server/api/apollo-server/

//     // Get the user token from the headers.
//     const token = req.headers.authorization || '';

//     // try to retrieve a user with the token
//     const user = getUser(token);

//     // add the user to the context
//     return { user };
//   },
// });

// const app = express();
// server.applyMiddleware({ app });

// const port = process.env.PORT;

// app.listen({ port: port }, () =>
//   console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
// );


import { ApolloServer } from 'apollo-server-express';
import { createContext } from './context';
import { schema } from './schema';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';

const { PORT = 5000 } = process.env;

const app = express();


app.use(cors())

const server = createServer(app);

const apollo = new ApolloServer({
  schema,
  context: createContext,
  tracing: process.env.NODE_ENV === 'development',
  introspection: process.env.NODE_ENV !== 'production',
  playground: process.env.NODE_ENV !== 'production',
});

apollo.applyMiddleware({ app });

apollo.installSubscriptionHandlers(server);

server.listen({ port: PORT }, () => {
  process.stdout.write(`🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}\n`);
});
