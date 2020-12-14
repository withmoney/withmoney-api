import { queryField, arg, nonNull } from '@nexus/schema';

export const AccountFindUniqueQuery = queryField('findUniqueAccount', {
  type: 'Account',
  args: {
    where: arg({
      type: 'AccountWhereUniqueInput',
    }),
  },
  resolve(_parent, { where }, { prisma }) {
    return prisma.account.findUnique({
      where,
    });
  },
});
