import { mutationField, nonNull, arg } from 'nexus';
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
  resolve: async (parent, { data }, ctx) => {
    const userId = await getUserId(ctx);

    return ctx.prisma.account.create({
      data: {
        ...data,
        user: { connect: { id: userId } },
      },
    });
  },
});
