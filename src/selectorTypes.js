import * as validate from './utils/validate';

const stringType = {
  validation: validate.string,
};

const numberType = {
  validation: validate.number,
};

const floatType = {
  validation: validate.float,
};

const boolType = {
  validation: validate.bool,
};

export const nameSelType = stringType;

export const emailSelType = stringType;

export const valueSelType = floatType;

export const userIdSelType = numberType;

export const accountIdSelType = numberType;

export const accountFromIdSelType = numberType;

export const typeSelType = stringType;

export const accountToIdSelType = numberType;

export const transferDateSelType = stringType;

export const transationDateSelType = stringType;

export const isPaidSelType = boolType;

export const batchSelType = stringType;

export const limitSelType = {
  ...numberType,
  default: 100,
};

export const pageSelType = {
  ...numberType,
  default: 1,
};
