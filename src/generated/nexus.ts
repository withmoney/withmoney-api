/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import * as Context from "./../context"
import { core } from "@nexus/schema"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Date";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    datetime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Date";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    datetime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
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
  AccountCreateInput: { // input type
    name: string; // String!
  }
  AccountListRelationFilter: { // input type
    every?: NexusGenInputs['AccountWhereInput'] | null; // AccountWhereInput
    none?: NexusGenInputs['AccountWhereInput'] | null; // AccountWhereInput
    some?: NexusGenInputs['AccountWhereInput'] | null; // AccountWhereInput
  }
  AccountOrderByInput: { // input type
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    deletedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    updatedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    userId?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  AccountUpdateInput: { // input type
    name: string; // String!
  }
  AccountWhereInput: { // input type
    AND?: NexusGenInputs['AccountWhereInput'][] | null; // [AccountWhereInput!]
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    deletedAt?: NexusGenInputs['DateTimeNullableFilter'] | null; // DateTimeNullableFilter
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    NOT?: NexusGenInputs['AccountWhereInput'][] | null; // [AccountWhereInput!]
    operations?: NexusGenInputs['OperationListRelationFilter'] | null; // OperationListRelationFilter
    OR?: NexusGenInputs['AccountWhereInput'][] | null; // [AccountWhereInput!]
    updatedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    user?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    userId?: NexusGenInputs['StringFilter'] | null; // StringFilter
  }
  AccountWhereUniqueInput: { // input type
    id?: string | null; // String
  }
  BoolFilter: { // input type
    equals?: boolean | null; // Boolean
    not?: NexusGenInputs['NestedBoolFilter'] | null; // NestedBoolFilter
  }
  CategoryCreateInput: { // input type
    name: string; // String!
    type: NexusGenEnums['TransactionType']; // TransactionType!
  }
  CategoryListRelationFilter: { // input type
    every?: NexusGenInputs['CategoryWhereInput'] | null; // CategoryWhereInput
    none?: NexusGenInputs['CategoryWhereInput'] | null; // CategoryWhereInput
    some?: NexusGenInputs['CategoryWhereInput'] | null; // CategoryWhereInput
  }
  CategoryOrderByInput: { // input type
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    deletedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    type?: NexusGenEnums['SortOrder'] | null; // SortOrder
    updatedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    userId?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  CategoryUpdateInput: { // input type
    name: string; // String!
    type: NexusGenEnums['TransactionType']; // TransactionType!
  }
  CategoryWhereInput: { // input type
    AND?: NexusGenInputs['CategoryWhereInput'][] | null; // [CategoryWhereInput!]
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    deletedAt?: NexusGenInputs['DateTimeNullableFilter'] | null; // DateTimeNullableFilter
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    NOT?: NexusGenInputs['CategoryWhereInput'][] | null; // [CategoryWhereInput!]
    operations?: NexusGenInputs['OperationListRelationFilter'] | null; // OperationListRelationFilter
    OR?: NexusGenInputs['CategoryWhereInput'][] | null; // [CategoryWhereInput!]
    type?: NexusGenInputs['EnumTransactionTypeFilter'] | null; // EnumTransactionTypeFilter
    updatedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    user?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    userId?: NexusGenInputs['StringFilter'] | null; // StringFilter
  }
  CategoryWhereUniqueInput: { // input type
    id?: string | null; // String
  }
  DateTimeFilter: { // input type
    equals?: NexusGenScalars['DateTime'] | null; // DateTime
    gt?: NexusGenScalars['DateTime'] | null; // DateTime
    gte?: NexusGenScalars['DateTime'] | null; // DateTime
    in?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
    lt?: NexusGenScalars['DateTime'] | null; // DateTime
    lte?: NexusGenScalars['DateTime'] | null; // DateTime
    not?: NexusGenInputs['NestedDateTimeFilter'] | null; // NestedDateTimeFilter
    notIn?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
  }
  DateTimeNullableFilter: { // input type
    equals?: NexusGenScalars['DateTime'] | null; // DateTime
    gt?: NexusGenScalars['DateTime'] | null; // DateTime
    gte?: NexusGenScalars['DateTime'] | null; // DateTime
    in?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
    lt?: NexusGenScalars['DateTime'] | null; // DateTime
    lte?: NexusGenScalars['DateTime'] | null; // DateTime
    not?: NexusGenInputs['NestedDateTimeNullableFilter'] | null; // NestedDateTimeNullableFilter
    notIn?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
  }
  EnumTransactionTypeFilter: { // input type
    equals?: NexusGenEnums['TransactionType'] | null; // TransactionType
    in?: NexusGenEnums['TransactionType'][] | null; // [TransactionType!]
    not?: NexusGenInputs['NestedEnumTransactionTypeFilter'] | null; // NestedEnumTransactionTypeFilter
    notIn?: NexusGenEnums['TransactionType'][] | null; // [TransactionType!]
  }
  FloatFilter: { // input type
    equals?: number | null; // Float
    gt?: number | null; // Float
    gte?: number | null; // Float
    in?: number[] | null; // [Float!]
    lt?: number | null; // Float
    lte?: number | null; // Float
    not?: NexusGenInputs['NestedFloatFilter'] | null; // NestedFloatFilter
    notIn?: number[] | null; // [Float!]
  }
  NestedBoolFilter: { // input type
    equals?: boolean | null; // Boolean
    not?: NexusGenInputs['NestedBoolFilter'] | null; // NestedBoolFilter
  }
  NestedDateTimeFilter: { // input type
    equals?: NexusGenScalars['DateTime'] | null; // DateTime
    gt?: NexusGenScalars['DateTime'] | null; // DateTime
    gte?: NexusGenScalars['DateTime'] | null; // DateTime
    in?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
    lt?: NexusGenScalars['DateTime'] | null; // DateTime
    lte?: NexusGenScalars['DateTime'] | null; // DateTime
    not?: NexusGenInputs['NestedDateTimeFilter'] | null; // NestedDateTimeFilter
    notIn?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
  }
  NestedDateTimeNullableFilter: { // input type
    equals?: NexusGenScalars['DateTime'] | null; // DateTime
    gt?: NexusGenScalars['DateTime'] | null; // DateTime
    gte?: NexusGenScalars['DateTime'] | null; // DateTime
    in?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
    lt?: NexusGenScalars['DateTime'] | null; // DateTime
    lte?: NexusGenScalars['DateTime'] | null; // DateTime
    not?: NexusGenInputs['NestedDateTimeNullableFilter'] | null; // NestedDateTimeNullableFilter
    notIn?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
  }
  NestedEnumTransactionTypeFilter: { // input type
    equals?: NexusGenEnums['TransactionType'] | null; // TransactionType
    in?: NexusGenEnums['TransactionType'][] | null; // [TransactionType!]
    not?: NexusGenInputs['NestedEnumTransactionTypeFilter'] | null; // NestedEnumTransactionTypeFilter
    notIn?: NexusGenEnums['TransactionType'][] | null; // [TransactionType!]
  }
  NestedFloatFilter: { // input type
    equals?: number | null; // Float
    gt?: number | null; // Float
    gte?: number | null; // Float
    in?: number[] | null; // [Float!]
    lt?: number | null; // Float
    lte?: number | null; // Float
    not?: NexusGenInputs['NestedFloatFilter'] | null; // NestedFloatFilter
    notIn?: number[] | null; // [Float!]
  }
  NestedStringFilter: { // input type
    contains?: string | null; // String
    endsWith?: string | null; // String
    equals?: string | null; // String
    gt?: string | null; // String
    gte?: string | null; // String
    in?: string[] | null; // [String!]
    lt?: string | null; // String
    lte?: string | null; // String
    not?: NexusGenInputs['NestedStringFilter'] | null; // NestedStringFilter
    notIn?: string[] | null; // [String!]
    startsWith?: string | null; // String
  }
  NestedStringNullableFilter: { // input type
    contains?: string | null; // String
    endsWith?: string | null; // String
    equals?: string | null; // String
    gt?: string | null; // String
    gte?: string | null; // String
    in?: string[] | null; // [String!]
    lt?: string | null; // String
    lte?: string | null; // String
    not?: NexusGenInputs['NestedStringNullableFilter'] | null; // NestedStringNullableFilter
    notIn?: string[] | null; // [String!]
    startsWith?: string | null; // String
  }
  OperationCreateInput: { // input type
    accountId: string; // String!
    categoryId?: string | null; // String
    isPaid: boolean; // Boolean!
    name: string; // String!
    type: NexusGenEnums['TransactionType']; // TransactionType!
    value: number; // Float!
  }
  OperationListRelationFilter: { // input type
    every?: NexusGenInputs['OperationWhereInput'] | null; // OperationWhereInput
    none?: NexusGenInputs['OperationWhereInput'] | null; // OperationWhereInput
    some?: NexusGenInputs['OperationWhereInput'] | null; // OperationWhereInput
  }
  OperationOrderByInput: { // input type
    accountId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    categoryId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    deletedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    isPaid?: NexusGenEnums['SortOrder'] | null; // SortOrder
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    type?: NexusGenEnums['SortOrder'] | null; // SortOrder
    updatedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    userId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    value?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  OperationUpdateInput: { // input type
    accountId: string; // String!
    categoryId?: string | null; // String
    isPaid: boolean; // Boolean!
    name: string; // String!
    type: NexusGenEnums['TransactionType']; // TransactionType!
    value: number; // Float!
  }
  OperationWhereInput: { // input type
    account?: NexusGenInputs['AccountWhereInput'] | null; // AccountWhereInput
    accountId?: NexusGenInputs['StringFilter'] | null; // StringFilter
    AND?: NexusGenInputs['OperationWhereInput'][] | null; // [OperationWhereInput!]
    category?: NexusGenInputs['CategoryWhereInput'] | null; // CategoryWhereInput
    categoryId?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    deletedAt?: NexusGenInputs['DateTimeNullableFilter'] | null; // DateTimeNullableFilter
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
    isPaid?: NexusGenInputs['BoolFilter'] | null; // BoolFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    NOT?: NexusGenInputs['OperationWhereInput'][] | null; // [OperationWhereInput!]
    OR?: NexusGenInputs['OperationWhereInput'][] | null; // [OperationWhereInput!]
    type?: NexusGenInputs['EnumTransactionTypeFilter'] | null; // EnumTransactionTypeFilter
    updatedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    user?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    userId?: NexusGenInputs['StringFilter'] | null; // StringFilter
    value?: NexusGenInputs['FloatFilter'] | null; // FloatFilter
  }
  OperationWhereUniqueInput: { // input type
    id?: string | null; // String
  }
  RegisterInput: { // input type
    birthday?: NexusGenScalars['Date'] | null; // Date
    email: string; // String!
    firstName: string; // String!
    lastName: string; // String!
    password: string; // String!
  }
  StringFilter: { // input type
    contains?: string | null; // String
    endsWith?: string | null; // String
    equals?: string | null; // String
    gt?: string | null; // String
    gte?: string | null; // String
    in?: string[] | null; // [String!]
    lt?: string | null; // String
    lte?: string | null; // String
    mode?: NexusGenEnums['QueryMode'] | null; // QueryMode
    not?: NexusGenInputs['NestedStringFilter'] | null; // NestedStringFilter
    notIn?: string[] | null; // [String!]
    startsWith?: string | null; // String
  }
  StringNullableFilter: { // input type
    contains?: string | null; // String
    endsWith?: string | null; // String
    equals?: string | null; // String
    gt?: string | null; // String
    gte?: string | null; // String
    in?: string[] | null; // [String!]
    lt?: string | null; // String
    lte?: string | null; // String
    mode?: NexusGenEnums['QueryMode'] | null; // QueryMode
    not?: NexusGenInputs['NestedStringNullableFilter'] | null; // NestedStringNullableFilter
    notIn?: string[] | null; // [String!]
    startsWith?: string | null; // String
  }
  UserUpdateInput: { // input type
    birthday?: NexusGenScalars['Date'] | null; // Date
    email?: string | null; // String
    name?: string | null; // String
    nickname?: string | null; // String
    phone?: string | null; // String
  }
  UserWhereInput: { // input type
    accounts?: NexusGenInputs['AccountListRelationFilter'] | null; // AccountListRelationFilter
    AND?: NexusGenInputs['UserWhereInput'][] | null; // [UserWhereInput!]
    birthDay?: NexusGenInputs['DateTimeNullableFilter'] | null; // DateTimeNullableFilter
    categories?: NexusGenInputs['CategoryListRelationFilter'] | null; // CategoryListRelationFilter
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    deletedAt?: NexusGenInputs['DateTimeNullableFilter'] | null; // DateTimeNullableFilter
    email?: NexusGenInputs['StringFilter'] | null; // StringFilter
    firstName?: NexusGenInputs['StringFilter'] | null; // StringFilter
    hashToChangePassword?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    hashToVerifyEmail?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    hasVerifiedEmail?: NexusGenInputs['BoolFilter'] | null; // BoolFilter
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
    lastName?: NexusGenInputs['StringFilter'] | null; // StringFilter
    NOT?: NexusGenInputs['UserWhereInput'][] | null; // [UserWhereInput!]
    operations?: NexusGenInputs['OperationListRelationFilter'] | null; // OperationListRelationFilter
    OR?: NexusGenInputs['UserWhereInput'][] | null; // [UserWhereInput!]
    password?: NexusGenInputs['StringFilter'] | null; // StringFilter
    updatedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
  }
}

export interface NexusGenEnums {
  QueryMode: "default" | "insensitive"
  SortOrder: "asc" | "desc"
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
    userId: string; // String!
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
  Operation: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    deletedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    isPaid: boolean; // Boolean!
    name: string; // String!
    type: NexusGenEnums['TransactionType']; // TransactionType!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    value: number; // Float!
  }
  Query: {};
  Subscription: {};
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
    operations: NexusGenRootTypes['Operation'][]; // [Operation!]!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user: NexusGenRootTypes['User']; // User!
    userId: string; // String!
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
    operations: NexusGenRootTypes['Operation'][]; // [Operation!]!
    type: NexusGenEnums['TransactionType']; // TransactionType!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user: NexusGenRootTypes['User']; // User!
  }
  Mutation: { // field return type
    changePassword: string | null; // String
    checkHashEmail: string | null; // String
    createOneAccount: NexusGenRootTypes['Account']; // Account!
    createOneCategory: NexusGenRootTypes['Category']; // Category!
    createOneOperation: NexusGenRootTypes['Operation']; // Operation!
    deleteOneAccount: NexusGenRootTypes['Account'] | null; // Account
    deleteOneCategory: NexusGenRootTypes['Category'] | null; // Category
    deleteOneOperation: NexusGenRootTypes['Operation'] | null; // Operation
    login: NexusGenRootTypes['AuthPayload'] | null; // AuthPayload
    register: string | null; // String
    requestChangePassword: string | null; // String
    restoreOneAccount: NexusGenRootTypes['Account'] | null; // Account
    restoreOneCategory: NexusGenRootTypes['Category'] | null; // Category
    restoreOneOperation: NexusGenRootTypes['Operation'] | null; // Operation
    updateOneAccount: NexusGenRootTypes['Account']; // Account!
    updateOneCategory: NexusGenRootTypes['Category']; // Category!
    updateOneOperation: NexusGenRootTypes['Operation']; // Operation!
    updateOneUser: NexusGenRootTypes['User']; // User!
  }
  Operation: { // field return type
    account: NexusGenRootTypes['Account']; // Account!
    category: NexusGenRootTypes['Category'] | null; // Category
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    deletedAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    isPaid: boolean; // Boolean!
    name: string; // String!
    type: NexusGenEnums['TransactionType']; // TransactionType!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user: NexusGenRootTypes['User']; // User!
    value: number; // Float!
  }
  Query: { // field return type
    findUniqueAccount: NexusGenRootTypes['Account'] | null; // Account
    me: NexusGenRootTypes['User'] | null; // User
  }
  Subscription: { // field return type
    userSignedIn: NexusGenRootTypes['User'] | null; // User
    userUpdated: NexusGenRootTypes['User'] | null; // User
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
    operations: NexusGenRootTypes['Operation'][]; // [Operation!]!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
}

export interface NexusGenFieldTypeNames {
  Account: { // field return type name
    createdAt: 'DateTime'
    deletedAt: 'DateTime'
    id: 'String'
    name: 'String'
    operations: 'Operation'
    updatedAt: 'DateTime'
    user: 'User'
    userId: 'String'
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
    operations: 'Operation'
    type: 'TransactionType'
    updatedAt: 'DateTime'
    user: 'User'
  }
  Mutation: { // field return type name
    changePassword: 'String'
    checkHashEmail: 'String'
    createOneAccount: 'Account'
    createOneCategory: 'Category'
    createOneOperation: 'Operation'
    deleteOneAccount: 'Account'
    deleteOneCategory: 'Category'
    deleteOneOperation: 'Operation'
    login: 'AuthPayload'
    register: 'String'
    requestChangePassword: 'String'
    restoreOneAccount: 'Account'
    restoreOneCategory: 'Category'
    restoreOneOperation: 'Operation'
    updateOneAccount: 'Account'
    updateOneCategory: 'Category'
    updateOneOperation: 'Operation'
    updateOneUser: 'User'
  }
  Operation: { // field return type name
    account: 'Account'
    category: 'Category'
    createdAt: 'DateTime'
    deletedAt: 'DateTime'
    id: 'String'
    isPaid: 'Boolean'
    name: 'String'
    type: 'TransactionType'
    updatedAt: 'DateTime'
    user: 'User'
    value: 'Float'
  }
  Query: { // field return type name
    findUniqueAccount: 'Account'
    me: 'User'
  }
  Subscription: { // field return type name
    userSignedIn: 'User'
    userUpdated: 'User'
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
    operations: 'Operation'
    updatedAt: 'DateTime'
  }
}

export interface NexusGenArgTypes {
  Account: {
    operations: { // args
      after?: NexusGenInputs['OperationWhereUniqueInput'] | null; // OperationWhereUniqueInput
      before?: NexusGenInputs['OperationWhereUniqueInput'] | null; // OperationWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
      orderBy?: NexusGenInputs['OperationOrderByInput'][] | null; // [OperationOrderByInput!]
      where?: NexusGenInputs['OperationWhereInput'] | null; // OperationWhereInput
    }
  }
  Category: {
    operations: { // args
      after?: NexusGenInputs['OperationWhereUniqueInput'] | null; // OperationWhereUniqueInput
      before?: NexusGenInputs['OperationWhereUniqueInput'] | null; // OperationWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
      orderBy?: NexusGenInputs['OperationOrderByInput'][] | null; // [OperationOrderByInput!]
      where?: NexusGenInputs['OperationWhereInput'] | null; // OperationWhereInput
    }
  }
  Mutation: {
    changePassword: { // args
      hash: string; // String!
      password: string; // String!
    }
    checkHashEmail: { // args
      hash: string; // String!
    }
    createOneAccount: { // args
      data: NexusGenInputs['AccountCreateInput']; // AccountCreateInput!
    }
    createOneCategory: { // args
      data: NexusGenInputs['CategoryCreateInput']; // CategoryCreateInput!
    }
    createOneOperation: { // args
      data: NexusGenInputs['OperationCreateInput']; // OperationCreateInput!
    }
    deleteOneAccount: { // args
      where: NexusGenInputs['AccountWhereUniqueInput']; // AccountWhereUniqueInput!
    }
    deleteOneCategory: { // args
      where: NexusGenInputs['CategoryWhereUniqueInput']; // CategoryWhereUniqueInput!
    }
    deleteOneOperation: { // args
      where: NexusGenInputs['OperationWhereUniqueInput']; // OperationWhereUniqueInput!
    }
    login: { // args
      email: string; // String!
      password: string; // String!
    }
    register: { // args
      user: NexusGenInputs['RegisterInput']; // RegisterInput!
    }
    requestChangePassword: { // args
      email: string; // String!
    }
    restoreOneAccount: { // args
      where: NexusGenInputs['AccountWhereUniqueInput']; // AccountWhereUniqueInput!
    }
    restoreOneCategory: { // args
      where: NexusGenInputs['CategoryWhereUniqueInput']; // CategoryWhereUniqueInput!
    }
    restoreOneOperation: { // args
      where: NexusGenInputs['OperationWhereUniqueInput']; // OperationWhereUniqueInput!
    }
    updateOneAccount: { // args
      data: NexusGenInputs['AccountUpdateInput']; // AccountUpdateInput!
      where: NexusGenInputs['AccountWhereUniqueInput']; // AccountWhereUniqueInput!
    }
    updateOneCategory: { // args
      data: NexusGenInputs['CategoryUpdateInput']; // CategoryUpdateInput!
      where: NexusGenInputs['CategoryWhereUniqueInput']; // CategoryWhereUniqueInput!
    }
    updateOneOperation: { // args
      data: NexusGenInputs['OperationUpdateInput']; // OperationUpdateInput!
      where: NexusGenInputs['OperationWhereUniqueInput']; // OperationWhereUniqueInput!
    }
    updateOneUser: { // args
      user: NexusGenInputs['UserUpdateInput']; // UserUpdateInput!
    }
  }
  Query: {
    findUniqueAccount: { // args
      where?: NexusGenInputs['AccountWhereUniqueInput'] | null; // AccountWhereUniqueInput
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
  User: {
    accounts: { // args
      after?: NexusGenInputs['AccountWhereUniqueInput'] | null; // AccountWhereUniqueInput
      before?: NexusGenInputs['AccountWhereUniqueInput'] | null; // AccountWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
      orderBy?: NexusGenInputs['AccountOrderByInput'][] | null; // [AccountOrderByInput!]
      where?: NexusGenInputs['AccountWhereInput'] | null; // AccountWhereInput
    }
    categories: { // args
      after?: NexusGenInputs['CategoryWhereUniqueInput'] | null; // CategoryWhereUniqueInput
      before?: NexusGenInputs['CategoryWhereUniqueInput'] | null; // CategoryWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
      orderBy?: NexusGenInputs['CategoryOrderByInput'][] | null; // [CategoryOrderByInput!]
      where?: NexusGenInputs['CategoryWhereInput'] | null; // CategoryWhereInput
    }
    operations: { // args
      after?: NexusGenInputs['OperationWhereUniqueInput'] | null; // OperationWhereUniqueInput
      before?: NexusGenInputs['OperationWhereUniqueInput'] | null; // OperationWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
      orderBy?: NexusGenInputs['OperationOrderByInput'][] | null; // [OperationOrderByInput!]
      where?: NexusGenInputs['OperationWhereInput'] | null; // OperationWhereInput
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
  context: Context.Context;
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