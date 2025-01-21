import { objectType } from 'nexus';
import { Operation } from 'nexus-prisma';

export const OperationType = objectType({
  name: Operation.$name,
  description: Operation.$description,
  definition(t) {
    t.field(Operation.id);
    t.field(Operation.name);
    t.field(Operation.value);
    t.field(Operation.type);
    t.field(Operation.isPaid);
    t.field(Operation.paidAt);
    t.field(Operation.createdAt);
    t.field(Operation.updatedAt);
    t.field(Operation.deletedAt);
    t.field(Operation.account);
    t.field(Operation.user);
    t.field(Operation.creditCard);
    t.field(Operation.category);
    t.field(Operation.accountId);
    t.field(Operation.userId);
    t.field(Operation.creditCardId);
    t.field(Operation.categoryId);
  },
});

export const CalcCreditCardsLimitResults = objectType({
  name: 'CalcCreditCardsLimitResults',
  definition(t) {
    t.float('limit');
    t.float('limitFree');
    t.float('limitBlocked');
    t.field('creditCard', { type: 'CreditCard' });
  },
});

export const CalcPreviousBalanceResult = objectType({
  name: 'CalcPreviousBalanceResult',
  definition(t) {
    t.float('amount');
  },
});

export const CreditCardLimit = objectType({
  name: 'CreditCardLimitResult',
  definition(t) {
    t.float('limit');
    t.float('limitFree');
    t.float('limitBlocked');
  },
});
