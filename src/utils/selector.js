import R from 'ramda';

const getDefault = fieldCfg => R.propOr(
  null,
  'default',
)(fieldCfg);

const getVal = (fieldCfg, key) => R.propOr(
  getDefault(fieldCfg),
  key,
);

const validateVal = (fieldCfg, key) => R.ifElse(
  R.pipe(R.prop('validation')(fieldCfg)),
  R.objOf(key),
  R.always({}),
);

const addFilter = (qr, fieldCfg, key) => (
  validateVal(fieldCfg, key)(getVal(fieldCfg, key)(qr))
);

const selector = (fields, query) => (
  R.mergeAll(Object.keys(fields).map(key => (
    addFilter(query, R.prop(key)(fields), key)
  )))
);

export default selector;
