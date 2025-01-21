import { queryField, arg, nonNull, list } from 'nexus';
import { getUserId } from '../../../utils';

import { inputObjectType } from 'nexus';

export const OperationFindManyQuery = queryField('findManyOperation', {
  type: nonNull(list(nonNull('Operation'))),
  args: {
    where: 'OperationWhereInput',
    orderBy: list(arg({ type: 'OperationOrderByInput' })),
    cursor: 'OperationWhereUniqueInput',
    skip: 'Int',
    take: 'Int',
  },
  resolve: async (_parent, args, ctx) => {
    const userId = await getUserId(ctx);

    return ctx.prisma.operation.findMany({
      ...args,
      where: {
        ...args.where,
        userId,
      },
    });
  },
});
