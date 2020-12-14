import { objectType } from '@nexus/schema';

export const Account = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Account',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.userId();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
    t.model.user();
    t.model.operations({ pagination: true, filtering: true, ordering: true });
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
