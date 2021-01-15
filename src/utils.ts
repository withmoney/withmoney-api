import { AuthenticationError } from 'apollo-server';
import { verify } from 'jsonwebtoken';

import { Context } from './context';

const { SECRET_KEY } = process.env;
export const APP_SECRET = SECRET_KEY || 'secret';

interface Token {
  userId: string;
}

export async function getUserId(context: Context): Promise<string> {
  const Authorization = context.request.req.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const verifiedToken = verify(token, APP_SECRET) as Token;
    const userId = verifiedToken && verifiedToken.userId;
    if (userId) {
      const data = await context.prisma.user.findUnique({ where: { id: userId } });
      if (!data) {
        throw new AuthenticationError('#1 must authenticate');
      }
      return userId;
    } else {
      throw new AuthenticationError('#2 must authenticate');
    }
  }
  throw new AuthenticationError('#3 must authenticate');
}
