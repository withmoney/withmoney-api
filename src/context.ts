import { PrismaClient } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';
import { type IncomingMessage } from 'http';


const prisma = new PrismaClient();
const { SECRET_KEY } = process.env;

export interface Context {
  prisma: PrismaClient;
  pubsub: PubSub;
  appSecret: string;
  req: IncomingMessage;
}

const pubsub = new PubSub();

export async function createContext({ req }: { req: IncomingMessage }): Promise<Context> {
  return {
    req,
    prisma,
    pubsub,
    appSecret: SECRET_KEY || 'secret',
  };
}
