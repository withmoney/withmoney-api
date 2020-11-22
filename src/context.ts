import { PrismaClient } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';
import { Request } from 'apollo-server';

const prisma = new PrismaClient();
const { SECRET_KEY } = process.env;

export interface Context {
  request: Request & any;
  prisma: PrismaClient;
  pubsub: PubSub;
  appSecret: string;
}

const pubsub = new PubSub();

export function createContext(request: Request): Context {
  return {
    request,
    prisma,
    pubsub,
    appSecret: SECRET_KEY || 'secret',
  };
}
