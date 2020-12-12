import { asNexusMethod, enumType } from '@nexus/schema';

import { GraphQLDate } from 'graphql-iso-date';
import { GraphQLUpload } from 'graphql-upload';

export const Upload = GraphQLUpload;
export const DateTime = GraphQLDate;
export const GQLDate = asNexusMethod(GraphQLDate, 'date');

export const TransactionType = enumType({
  name: 'TransactionType',
  members: ['CreditCard', 'Deposit', 'FixedExpense', 'VariableExpense'],
});
