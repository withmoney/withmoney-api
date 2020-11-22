import { AuthenticationError } from 'apollo-server';

import { Context } from './context';
import { verify } from 'jsonwebtoken';

const { SECRET_KEY } = process.env;
export const APP_SECRET = SECRET_KEY || 'secret';

interface Token {
  userId: string;
}

export function getUserId(context: Context): string {
  const Authorization = context.request.req.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const verifiedToken = verify(token, APP_SECRET) as Token;
    const userId = verifiedToken && verifiedToken.userId;
    if (userId) {
      return userId;
    } else {
      throw new AuthenticationError('must authenticate');
    }
  }
  throw new AuthenticationError('must authenticate');
}
