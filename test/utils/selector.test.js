import selector from '../../src/utils/selector';
import * as validate from '../../src/utils/validate';

it('selector with a convert config', () => {
  const query = {
    id: '1',
  };
  const fieldsConfig = {
    id: {
      validation: validate.number,
      convert: x => parseInt(x, 10),
    },
  };

  expect(selector(fieldsConfig, query)).toEqual({ id: 1 });
});

it('should match object', () => {
  const queryOne = {};
  const queryTwo = {
    name: 'David',
  };
  const queryThree = {
    limit: 50,
    name: '',
  };

  const fieldsConfig = {
    name: {
      validation: validate.string,
    },
    limit: {
      validation: validate.number,
      default: 10,
    },
  };

  expect(selector(fieldsConfig, queryOne)).toEqual({ limit: 10 });
  expect(selector(fieldsConfig, queryTwo)).toEqual({ limit: 10, name: 'David' });
  expect(selector(fieldsConfig, queryThree)).toEqual({ limit: 50 });
});
