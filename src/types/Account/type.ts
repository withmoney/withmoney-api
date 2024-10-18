import { objectType } from 'nexus';
import {Account} from "nexus-prisma";

export const AccountType = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: Account.$name,
  description: Account.$description,
  definition(t) {
    t.field(Account.id);
    t.field(Account.name);
    t.field(Account.currency);
    t.field(Account.userId);
    t.field(Account.createdAt);
    t.field(Account.updatedAt);
    t.field(Account.deletedAt);
    // t.field(Account.user);
    // t.field(Account.operations);

    //   t.field('user', {
    //     type: 'User',
    //     resolve(root: any) {
    //       return root.user;
    //     },
    //   });
    //   t.list.field('operations', {
    //     type: 'Operation',
    //     args: {
    //       where: 'OperationWhereInput',
    //       orderBy: 'OperationOrderByInput',
    //       cursor: 'OperationWhereUniqueInput',
    //       take: 'Int',
    //       skip: 'Int',
    //       distinct: 'OperationScalarFieldEnum',
    //     },
    //     resolve(root: any) {
    //       return root.operations;
    //     },
    //   });
  },
});
