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

export const nameSelType = stringType;

export const valueSelType = floatType;

export const userIdSelType = numberType;

export const batchSelType = stringType;

export const limitSelType = {
  ...numberType,
  default: 100,
};

export const pageSelType = {
  ...numberType,
  default: 1,
};
