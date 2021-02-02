import { asNexusMethod, enumType, objectType } from 'nexus';

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

export const Locale = enumType({
  name: 'Locale',
  members: ['ptBR', 'enUS'],
});

export const Currency = enumType({
  name: 'Currency',
  members: ['USD', 'EUR', 'BRL', 'GBP'],
});

export const Pagination = objectType({
  name: 'Pagination',
  definition(t) {
    t.int('totalItems');
  },
});
