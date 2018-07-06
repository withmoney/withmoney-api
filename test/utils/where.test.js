import where, { ops } from '../../src/utils/where';

describe('where', () => {
  it('just one', () => {
    const query = {
      idade: {
        [ops.NE]: 3,
      },
    };
    expect(where(query)).toBe('WHERE\n' +
      '\tidade != 3');
  });

  it('all kinds', () => {
    const query = {
      [ops.AND]: {
        name: 'David',
        email: {
          [ops.NE]: 'david@costa.com',
        },
      },
      [ops.OR]: {
        name: 'David',
        email: 'david@costa.com',
      },
      name: 'Legal',
      idade: {
        [ops.NE]: 3,
      },
    };
    expect(where(query)).toBe('WHERE\n' +
      '\t(name = David AND email != david@costa.com)\n' +
      'AND\n' +
      '\t(name = David OR email = david@costa.com)\n' +
      'AND\n' +
      '\t(name = Legal)\n' +
      'AND\n' +
      '\t(idade != 3)');
  });
});
