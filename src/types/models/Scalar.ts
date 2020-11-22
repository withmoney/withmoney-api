import { asNexusMethod, enumType, scalarType } from '@nexus/schema';

import { GraphQLDate } from 'graphql-iso-date';
import { GraphQLUpload } from 'graphql-upload';

export const AuthType = enumType({
  name: 'AuthType',
  members: ['Email', 'Facebook', 'Google', 'Apple'],
});

enum GenderType {
  Male = 'Male',
  Female = 'Female',
}

export const Gender = scalarType({
  name: 'Gender',
  asNexusMethod: 'gender',
  parseValue(value: GenderType): GenderType {
    if (GenderType[value]) {
      return value;
    }
  },
  serialize(value) {
    return value;
  },
});

export const Upload = GraphQLUpload;
export const DateTime = GraphQLDate;
export const GQLDate = asNexusMethod(GraphQLDate, 'date');

enum TransactionTypeEnum {
  CreditCard = 'CreditCard',
  Deposit = 'Deposit',
  FixedExpense = 'FixedExpense',
  VariableExpense = 'VariableExpense',
}

// export const TransactionType = scalarType({
//   name: 'TransactionType',
//   asNexusMethod: 'type',
//   parseValue(value: TransactionTypeEnum): TransactionTypeEnum {
//     if (TransactionTypeEnum[value]) {
//       return value;
//     }
//   },
//   serialize(value) {
//     return value;
//   },
// });

export const TransactionType = enumType({
  name: 'TransactionType',
  members: ['CreditCard', 'Deposit', 'FixedExpense', 'VariableExpense'],
});
