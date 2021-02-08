import * as Typegen from 'nexus-plugin-prisma/typegen'
import * as Prisma from '@prisma/client';

// Pagination type
type Pagination = {
    first?: boolean
    last?: boolean
    before?: boolean
    after?: boolean
}

// Prisma custom scalar names
type CustomScalars = 'DateTime'

// Prisma model type definitions
interface PrismaModels {
  Account: Prisma.Account
  Category: Prisma.Category
  CreditCard: Prisma.CreditCard
  Operation: Prisma.Operation
  User: Prisma.User
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    accounts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'userId' | 'currency' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'user' | 'operations' | 'creditCards'
      ordering: 'id' | 'name' | 'userId' | 'currency' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'user'
    }
    categories: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'userId' | 'name' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'user' | 'operations'
      ordering: 'id' | 'userId' | 'name' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'user'
    }
    creditCards: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'accountId' | 'userId' | 'name' | 'brand' | 'limit' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'user' | 'account' | 'operations'
      ordering: 'id' | 'accountId' | 'userId' | 'name' | 'brand' | 'limit' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'user' | 'account'
    }
    operations: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'accountId' | 'categoryId' | 'userId' | 'creditCardId' | 'name' | 'value' | 'isPaid' | 'type' | 'paidAt' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'account' | 'category' | 'creditCard' | 'user'
      ordering: 'id' | 'accountId' | 'categoryId' | 'userId' | 'creditCardId' | 'name' | 'value' | 'isPaid' | 'type' | 'paidAt' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'account' | 'category' | 'creditCard' | 'user'
    }
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'email' | 'password' | 'firstName' | 'lastName' | 'language' | 'hasVerifiedEmail' | 'hashToVerifyEmail' | 'hashToChangePassword' | 'birthDay' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'accounts' | 'categories' | 'creditCards' | 'operations'
      ordering: 'id' | 'email' | 'password' | 'firstName' | 'lastName' | 'language' | 'hasVerifiedEmail' | 'hashToVerifyEmail' | 'hashToChangePassword' | 'birthDay' | 'createdAt' | 'updatedAt' | 'deletedAt'
    }
  },
  Account: {
    operations: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'accountId' | 'categoryId' | 'userId' | 'creditCardId' | 'name' | 'value' | 'isPaid' | 'type' | 'paidAt' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'account' | 'category' | 'creditCard' | 'user'
      ordering: 'id' | 'accountId' | 'categoryId' | 'userId' | 'creditCardId' | 'name' | 'value' | 'isPaid' | 'type' | 'paidAt' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'account' | 'category' | 'creditCard' | 'user'
    }
    creditCards: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'accountId' | 'userId' | 'name' | 'brand' | 'limit' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'user' | 'account' | 'operations'
      ordering: 'id' | 'accountId' | 'userId' | 'name' | 'brand' | 'limit' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'user' | 'account'
    }
  }
  Category: {
    operations: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'accountId' | 'categoryId' | 'userId' | 'creditCardId' | 'name' | 'value' | 'isPaid' | 'type' | 'paidAt' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'account' | 'category' | 'creditCard' | 'user'
      ordering: 'id' | 'accountId' | 'categoryId' | 'userId' | 'creditCardId' | 'name' | 'value' | 'isPaid' | 'type' | 'paidAt' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'account' | 'category' | 'creditCard' | 'user'
    }
  }
  CreditCard: {
    operations: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'accountId' | 'categoryId' | 'userId' | 'creditCardId' | 'name' | 'value' | 'isPaid' | 'type' | 'paidAt' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'account' | 'category' | 'creditCard' | 'user'
      ordering: 'id' | 'accountId' | 'categoryId' | 'userId' | 'creditCardId' | 'name' | 'value' | 'isPaid' | 'type' | 'paidAt' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'account' | 'category' | 'creditCard' | 'user'
    }
  }
  Operation: {

  }
  User: {
    accounts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'userId' | 'currency' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'user' | 'operations' | 'creditCards'
      ordering: 'id' | 'name' | 'userId' | 'currency' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'user'
    }
    categories: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'userId' | 'name' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'user' | 'operations'
      ordering: 'id' | 'userId' | 'name' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'user'
    }
    creditCards: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'accountId' | 'userId' | 'name' | 'brand' | 'limit' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'user' | 'account' | 'operations'
      ordering: 'id' | 'accountId' | 'userId' | 'name' | 'brand' | 'limit' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'user' | 'account'
    }
    operations: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'accountId' | 'categoryId' | 'userId' | 'creditCardId' | 'name' | 'value' | 'isPaid' | 'type' | 'paidAt' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'account' | 'category' | 'creditCard' | 'user'
      ordering: 'id' | 'accountId' | 'categoryId' | 'userId' | 'creditCardId' | 'name' | 'value' | 'isPaid' | 'type' | 'paidAt' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'account' | 'category' | 'creditCard' | 'user'
    }
  }
}

// Prisma output types metadata
interface NexusPrismaOutputs {
  Query: {
    account: 'Account'
    accounts: 'Account'
    category: 'Category'
    categories: 'Category'
    creditCard: 'CreditCard'
    creditCards: 'CreditCard'
    operation: 'Operation'
    operations: 'Operation'
    user: 'User'
    users: 'User'
  },
  Mutation: {
    createOneAccount: 'Account'
    updateOneAccount: 'Account'
    updateManyAccount: 'AffectedRowsOutput'
    deleteOneAccount: 'Account'
    deleteManyAccount: 'AffectedRowsOutput'
    upsertOneAccount: 'Account'
    createOneCategory: 'Category'
    updateOneCategory: 'Category'
    updateManyCategory: 'AffectedRowsOutput'
    deleteOneCategory: 'Category'
    deleteManyCategory: 'AffectedRowsOutput'
    upsertOneCategory: 'Category'
    createOneCreditCard: 'CreditCard'
    updateOneCreditCard: 'CreditCard'
    updateManyCreditCard: 'AffectedRowsOutput'
    deleteOneCreditCard: 'CreditCard'
    deleteManyCreditCard: 'AffectedRowsOutput'
    upsertOneCreditCard: 'CreditCard'
    createOneOperation: 'Operation'
    updateOneOperation: 'Operation'
    updateManyOperation: 'AffectedRowsOutput'
    deleteOneOperation: 'Operation'
    deleteManyOperation: 'AffectedRowsOutput'
    upsertOneOperation: 'Operation'
    createOneUser: 'User'
    updateOneUser: 'User'
    updateManyUser: 'AffectedRowsOutput'
    deleteOneUser: 'User'
    deleteManyUser: 'AffectedRowsOutput'
    upsertOneUser: 'User'
  },
  Account: {
    id: 'String'
    name: 'String'
    userId: 'String'
    currency: 'Currency'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    deletedAt: 'DateTime'
    user: 'User'
    operations: 'Operation'
    creditCards: 'CreditCard'
  }
  Category: {
    id: 'String'
    userId: 'String'
    name: 'String'
    type: 'TransactionType'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    deletedAt: 'DateTime'
    user: 'User'
    operations: 'Operation'
  }
  CreditCard: {
    id: 'String'
    accountId: 'String'
    userId: 'String'
    name: 'String'
    brand: 'CreditCardBrand'
    limit: 'Float'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    deletedAt: 'DateTime'
    user: 'User'
    account: 'Account'
    operations: 'Operation'
  }
  Operation: {
    id: 'String'
    accountId: 'String'
    categoryId: 'String'
    userId: 'String'
    creditCardId: 'String'
    name: 'String'
    value: 'Float'
    isPaid: 'Boolean'
    type: 'TransactionType'
    paidAt: 'DateTime'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    deletedAt: 'DateTime'
    account: 'Account'
    category: 'Category'
    creditCard: 'CreditCard'
    user: 'User'
  }
  User: {
    id: 'String'
    email: 'String'
    password: 'String'
    firstName: 'String'
    lastName: 'String'
    language: 'Locale'
    hasVerifiedEmail: 'Boolean'
    hashToVerifyEmail: 'String'
    hashToChangePassword: 'String'
    birthDay: 'DateTime'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    deletedAt: 'DateTime'
    accounts: 'Account'
    categories: 'Category'
    creditCards: 'CreditCard'
    operations: 'Operation'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  Account: Typegen.NexusPrismaFields<'Account'>
  Category: Typegen.NexusPrismaFields<'Category'>
  CreditCard: Typegen.NexusPrismaFields<'CreditCard'>
  Operation: Typegen.NexusPrismaFields<'Operation'>
  User: Typegen.NexusPrismaFields<'User'>
  Query: Typegen.NexusPrismaFields<'Query'>
  Mutation: Typegen.NexusPrismaFields<'Mutation'>
}

interface NexusPrismaGenTypes {
  inputs: NexusPrismaInputs
  outputs: NexusPrismaOutputs
  methods: NexusPrismaMethods
  models: PrismaModels
  pagination: Pagination
  scalars: CustomScalars
}

declare global {
  interface NexusPrismaGen extends NexusPrismaGenTypes {}

  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = Typegen.GetNexusPrisma<TypeName, ModelOrCrud>;
}
  