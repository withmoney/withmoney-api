import * as validate from './utils/validate';

export const nameSelType = {
  validation: validate.string,
};

export const batchSelType = {
  validation: validate.string,
};

export const limitSelType = {
  validation: validate.number,
  default: 100,
};

export const pageSelType = {
  validation: validate.number,
  default: 1,
};
