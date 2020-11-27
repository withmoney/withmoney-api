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
  Transaction: Prisma.Transaction
  User: Prisma.User
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    accounts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'userId' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'user' | 'transaction'
      ordering: 'id' | 'name' | 'userId' | 'createdAt' | 'updatedAt' | 'deletedAt'
    }
    categories: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'userId' | 'name' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'user' | 'transaction'
      ordering: 'id' | 'userId' | 'name' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt'
    }
    transactions: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'accountId' | 'categoryId' | 'userId' | 'name' | 'value' | 'isPaid' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'account' | 'category' | 'user'
      ordering: 'id' | 'accountId' | 'categoryId' | 'userId' | 'name' | 'value' | 'isPaid' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt'
    }
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'email' | 'password' | 'firstName' | 'lastName' | 'hasVerifiedEmail' | 'hashToVerifyEmail' | 'hashToChangePassword' | 'birthDay' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'accounts' | 'categories' | 'transaction'
      ordering: 'id' | 'email' | 'password' | 'firstName' | 'lastName' | 'hasVerifiedEmail' | 'hashToVerifyEmail' | 'hashToChangePassword' | 'birthDay' | 'createdAt' | 'updatedAt' | 'deletedAt'
    }
  },
  Account: {
    transaction: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'accountId' | 'categoryId' | 'userId' | 'name' | 'value' | 'isPaid' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'account' | 'category' | 'user'
      ordering: 'id' | 'accountId' | 'categoryId' | 'userId' | 'name' | 'value' | 'isPaid' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt'
    }
  }
  Category: {
    transaction: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'accountId' | 'categoryId' | 'userId' | 'name' | 'value' | 'isPaid' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'account' | 'category' | 'user'
      ordering: 'id' | 'accountId' | 'categoryId' | 'userId' | 'name' | 'value' | 'isPaid' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt'
    }
  }
  Transaction: {

  }
  User: {
    accounts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'userId' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'user' | 'transaction'
      ordering: 'id' | 'name' | 'userId' | 'createdAt' | 'updatedAt' | 'deletedAt'
    }
    categories: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'userId' | 'name' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'user' | 'transaction'
      ordering: 'id' | 'userId' | 'name' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt'
    }
    transaction: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'accountId' | 'categoryId' | 'userId' | 'name' | 'value' | 'isPaid' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'account' | 'category' | 'user'
      ordering: 'id' | 'accountId' | 'categoryId' | 'userId' | 'name' | 'value' | 'isPaid' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt'
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
    transaction: 'Transaction'
    transactions: 'Transaction'
    user: 'User'
    users: 'User'
  },
  Mutation: {
    createOneAccount: 'Account'
    updateOneAccount: 'Account'
    updateManyAccount: 'BatchPayload'
    deleteOneAccount: 'Account'
    deleteManyAccount: 'BatchPayload'
    upsertOneAccount: 'Account'
    createOneCategory: 'Category'
    updateOneCategory: 'Category'
    updateManyCategory: 'BatchPayload'
    deleteOneCategory: 'Category'
    deleteManyCategory: 'BatchPayload'
    upsertOneCategory: 'Category'
    createOneTransaction: 'Transaction'
    updateOneTransaction: 'Transaction'
    updateManyTransaction: 'BatchPayload'
    deleteOneTransaction: 'Transaction'
    deleteManyTransaction: 'BatchPayload'
    upsertOneTransaction: 'Transaction'
    createOneUser: 'User'
    updateOneUser: 'User'
    updateManyUser: 'BatchPayload'
    deleteOneUser: 'User'
    deleteManyUser: 'BatchPayload'
    upsertOneUser: 'User'
  },
  Account: {
    id: 'String'
    name: 'String'
    userId: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    deletedAt: 'DateTime'
    user: 'User'
    transaction: 'Transaction'
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
    transaction: 'Transaction'
  }
  Transaction: {
    id: 'String'
    accountId: 'String'
    categoryId: 'String'
    userId: 'String'
    name: 'String'
    value: 'Float'
    isPaid: 'Boolean'
    type: 'TransactionType'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    deletedAt: 'DateTime'
    account: 'Account'
    category: 'Category'
    user: 'User'
  }
  User: {
    id: 'String'
    email: 'String'
    password: 'String'
    firstName: 'String'
    lastName: 'String'
    hasVerifiedEmail: 'Boolean'
    hashToVerifyEmail: 'String'
    hashToChangePassword: 'String'
    birthDay: 'DateTime'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    deletedAt: 'DateTime'
    accounts: 'Account'
    categories: 'Category'
    transaction: 'Transaction'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  Account: Typegen.NexusPrismaFields<'Account'>
  Category: Typegen.NexusPrismaFields<'Category'>
  Transaction: Typegen.NexusPrismaFields<'Transaction'>
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
  