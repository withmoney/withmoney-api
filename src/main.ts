import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { createContext } from './context';
import { schema } from './schema';

const { PORT = 5000 } = process.env;

const app = express();

app.use(cors());

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
