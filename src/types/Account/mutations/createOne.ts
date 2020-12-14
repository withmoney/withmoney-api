import { mutationField, nonNull, arg } from '@nexus/schema';
import { getUserId } from '../../../utils';

export const AccountCreateOneMutation = mutationField('createOneAccount', {
  type: nonNull('Account'),
  args: {
    data: nonNull(
      arg({
        type: 'AccountCreateInput',
      }),
    ),
  },
  resolve: (parent, { data }, ctx) => {
    const userId = getUserId(ctx);

    return ctx.prisma.account.create({
      data: {
        ...data,
        user: { connect: { id: userId } },
      },
    });
  },
});
