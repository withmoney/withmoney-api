/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import { core } from "@nexus/schema"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Date";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Date";
  }
}
declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    model: NexusPrisma<TypeName, 'model'>
    crud: any
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  UserCreateInput: { // input type
    birthday?: NexusGenScalars['Date'] | null; // Date
    email: string; // String!
    firstName: string; // String!
    lastName: string; // String!
    password: string; // String!
    statusMessage?: string | null; // String
  }
  UserUpdateInput: { // input type
    birthday?: NexusGenScalars['Date'] | null; // Date
    email?: string | null; // String
    name?: string | null; // String
    nickname?: string | null; // String
    phone?: string | null; // String
    statusMessage?: string | null; // String
  }
}

export interface NexusGenEnums {
  AuthType: "Apple" | "Email" | "Facebook" | "Google"
  TransactionType: "CreditCard" | "Deposit" | "FixedExpense" | "VariableExpense"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  Date: any
  DateTime: any
  Upload: any
}

export interface NexusGenObjects {
  Account: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    deletedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    name: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  AuthPayload: { // root type
    token?: string | null; // String
    user?: NexusGenRootTypes['User'] | null; // User
  }
  Category: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    deletedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    name: string; // String!
    type: NexusGenEnums['TransactionType']; // TransactionType!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Mutation: {};
  Query: {};
  Subscription: {};
  Transaction: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    deletedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    name: string; // String!
    type: NexusGenEnums['TransactionType']; // TransactionType!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    value: number; // Float!
  }
  User: { // root type
    birthDay?: NexusGenScalars['DateTime'] | null; // DateTime
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    deletedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    email: string; // String!
    firstName: string; // String!
    hasVerifiedEmail: boolean; // Boolean!
    id: string; // String!
    lastName: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Account: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    deletedAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    name: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user: NexusGenRootTypes['User']; // User!
  }
  AuthPayload: { // field return type
    token: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
  }
  Category: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    deletedAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    name: string; // String!
    type: NexusGenEnums['TransactionType']; // TransactionType!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user: NexusGenRootTypes['User']; // User!
  }
  Mutation: { // field return type
    changePassword: string | null; // String
    checkHashEmail: string | null; // String
    createAccount: NexusGenRootTypes['Account'] | null; // Account
    createCategory: NexusGenRootTypes['Category'] | null; // Category
    createTransaction: NexusGenRootTypes['Transaction'] | null; // Transaction
    login: NexusGenRootTypes['AuthPayload'] | null; // AuthPayload
    register: string | null; // String
    requestChangePassword: string | null; // String
    updateProfile: NexusGenRootTypes['User'] | null; // User
  }
  Query: { // field return type
    categories: Array<NexusGenRootTypes['Category'] | null> | null; // [Category]
    me: NexusGenRootTypes['User'] | null; // User
    transactions: Array<NexusGenRootTypes['Transaction'] | null> | null; // [Transaction]
  }
  Subscription: { // field return type
    userSignedIn: NexusGenRootTypes['User'] | null; // User
    userUpdated: NexusGenRootTypes['User'] | null; // User
  }
  Transaction: { // field return type
    account: NexusGenRootTypes['Account']; // Account!
    category: NexusGenRootTypes['Category'] | null; // Category
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    deletedAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    name: string; // String!
    type: NexusGenEnums['TransactionType']; // TransactionType!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user: NexusGenRootTypes['User']; // User!
    value: number; // Float!
  }
  User: { // field return type
    accounts: NexusGenRootTypes['Account'][]; // [Account!]!
    birthDay: NexusGenScalars['DateTime'] | null; // DateTime
    categories: NexusGenRootTypes['Category'][]; // [Category!]!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    deletedAt: NexusGenScalars['DateTime'] | null; // DateTime
    email: string; // String!
    firstName: string; // String!
    hasVerifiedEmail: boolean; // Boolean!
    id: string; // String!
    lastName: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
}

export interface NexusGenFieldTypeNames {
  Account: { // field return type name
    createdAt: 'DateTime'
    deletedAt: 'DateTime'
    id: 'String'
    name: 'String'
    updatedAt: 'DateTime'
    user: 'User'
  }
  AuthPayload: { // field return type name
    token: 'String'
    user: 'User'
  }
  Category: { // field return type name
    createdAt: 'DateTime'
    deletedAt: 'DateTime'
    id: 'String'
    name: 'String'
    type: 'TransactionType'
    updatedAt: 'DateTime'
    user: 'User'
  }
  Mutation: { // field return type name
    changePassword: 'String'
    checkHashEmail: 'String'
    createAccount: 'Account'
    createCategory: 'Category'
    createTransaction: 'Transaction'
    login: 'AuthPayload'
    register: 'String'
    requestChangePassword: 'String'
    updateProfile: 'User'
  }
  Query: { // field return type name
    categories: 'Category'
    me: 'User'
    transactions: 'Transaction'
  }
  Subscription: { // field return type name
    userSignedIn: 'User'
    userUpdated: 'User'
  }
  Transaction: { // field return type name
    account: 'Account'
    category: 'Category'
    createdAt: 'DateTime'
    deletedAt: 'DateTime'
    id: 'String'
    name: 'String'
    type: 'TransactionType'
    updatedAt: 'DateTime'
    user: 'User'
    value: 'Float'
  }
  User: { // field return type name
    accounts: 'Account'
    birthDay: 'DateTime'
    categories: 'Category'
    createdAt: 'DateTime'
    deletedAt: 'DateTime'
    email: 'String'
    firstName: 'String'
    hasVerifiedEmail: 'Boolean'
    id: 'String'
    lastName: 'String'
    updatedAt: 'DateTime'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    changePassword: { // args
      hash: string; // String!
      password: string; // String!
    }
    checkHashEmail: { // args
      hash: string; // String!
    }
    createAccount: { // args
      name: string; // String!
    }
    createCategory: { // args
      name: string; // String!
      type: NexusGenEnums['TransactionType']; // TransactionType!
    }
    createTransaction: { // args
      accountId: string; // String!
      categoryId?: string | null; // String
      name: string; // String!
      type: NexusGenEnums['TransactionType']; // TransactionType!
      value: number; // Float!
    }
    login: { // args
      email: string; // String!
      password: string; // String!
    }
    register: { // args
      user: NexusGenInputs['UserCreateInput']; // UserCreateInput!
    }
    requestChangePassword: { // args
      email: string; // String!
    }
    updateProfile: { // args
      user?: NexusGenInputs['UserUpdateInput'] | null; // UserUpdateInput
    }
  }
  Query: {
    categories: { // args
      name?: string | null; // String
    }
  }
  Subscription: {
    userSignedIn: { // args
      userId: string; // String!
    }
    userUpdated: { // args
      userId: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Whether the type can be null
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean
    /**
     * Whether the type is list of values, or just a single value.
     * If list is true, we assume the type is a list. If list is an array,
     * we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[]
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Whether the type can be null
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean
    /**
     * Whether the type is list of values, or just a single value.
     * If list is true, we assume the type is a list. If list is an array,
     * we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[]
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
    /**
     * Whether the type can be null
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean
    /**
     * Whether the type is list of values, or just a single value.
     * If list is true, we assume the type is a list. If list is an array,
     * we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[]
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean
  }
}