import { asNexusMethod, enumType } from 'nexus';

import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date';
import { GraphQLUpload } from 'graphql-upload';

export const Upload = GraphQLUpload;
export const DateTime = GraphQLDate;
export const GQLDate = asNexusMethod(GraphQLDate, 'date');
export const GQLDateTime = asNexusMethod(GraphQLDateTime, 'datetime');

export const TransactionType = enumType({
  name: 'TransactionType',
  members: ['CreditCard', 'Deposit', 'FixedExpense', 'VariableExpense'],
});
