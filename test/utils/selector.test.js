import selector from '../../src/utils/selector';
import * as validate from '../../src/utils/validate';

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
