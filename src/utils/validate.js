import R from 'ramda';

export const string = R.compose(Boolean, R.length);

export const number = num => Number.isInteger(parseInt(num, 10));
