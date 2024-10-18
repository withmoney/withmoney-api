import { queryField, arg, nonNull, list } from 'nexus';
import { getUserId } from '../../../utils';

import {inputObjectType} from 'nexus';

export const OperationWhereInput = inputObjectType({
  name: 'OperationWhereInput',
  definition(t) {
    t.string('description');
    t.float('value');
    t.boolean('isPaid');
    t.id('creditCardId');
  },
});

export const OperationOrderByInput = inputObjectType({
  name: 'OperationOrderByInput',
  definition(t) {
    t.string('description');
    t.float('value');
    t.boolean('isPaid');
  },
});

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

    // @ts-ignore
    return ctx.prisma.operation.findMany({
      ...args,
      where: {
        ...args.where,
        userId,
      },
    });
  },
});
