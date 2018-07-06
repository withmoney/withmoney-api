/* eslint no-use-before-define: "off" */

import whereBuilder from './where';

const fieldsQuery = fields => fields
  .map(field => field
    .split(' as ')
    .map(each => each.trim())
    .join(' as '))
  .join(', ');

const ifISAll = fields => (
  fields.length ? fieldsQuery(fields) : '*'
);

const select = sql => (...fields) => (
  query({
    ...sql,
    select: `SELECT\n\t${ifISAll(fields)}`,
  })
);

const table = sql => tableName => (
  query({
    ...sql,
    table: `FROM\n\t${tableName}`,
  })
);

const where = sql => fields => query({
  ...sql,
  where: whereBuilder(fields),
});

const orderSql = [
  'select',
  'table',
  'where',
];

const toSql = sql => () => {
  const newSql = [];

  orderSql.forEach(item => typeof sql[item] === 'undefined' || newSql.push(sql[item]));

  return newSql.join('\n');
};

const build = sql => () => sql;

const query = (sql = {}) => ({
  select: select(sql),
  table: table(sql),
  where: where(sql),
  build: build(sql),
  toSql: toSql(sql),
});

export default query;
