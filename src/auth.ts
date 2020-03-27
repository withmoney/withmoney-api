import jwt from 'jsonwebtoken';

if (!process.env.SECRET_KEY) {
  /* istanbul ignore next */
  throw new Error('SECRET_KEY env is undefined');
}

export const getUser = (token: string) => {
  const data = jwt.decode(token.replace('Bearer ', ''), { json: true, complete: true });

  return (data && data.payload) || null;
};
