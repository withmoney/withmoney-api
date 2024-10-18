import { asNexusMethod, enumType, objectType } from 'nexus';

import { GraphQLDate , GraphQLDateTime } from 'graphql-scalars';

export const DateTime = GraphQLDate;

export const GQLDateTime = asNexusMethod(GraphQLDateTime, 'datetime');

export const TransactionType = enumType({
  name: 'TransactionType',
  members: ['CreditCard', 'Deposit', 'FixedExpense', 'VariableExpense'],
});

export const CreditCardBrand = enumType({
  name: 'CreditCardBrand',
  members: [
    'AmericanExpress',
    'BNDES',
    'Dinners',
    'ELO',
    'HiperCard',
    'MasterCard',
    'Other',
    'SoroCard',
    'Visa',
  ],
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
