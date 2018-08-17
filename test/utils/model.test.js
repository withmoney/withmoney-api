import bcrypt from 'bcrypt';
import { cryptPassword, getModelAlias } from '../../src/utils/model';

describe('model', () => {
  describe('getModelAlias should', () => {
    it('without alias', async () => {
      const Model = {
        Users: 'Users',
      };

      const result = getModelAlias({}, Model)('Users');

      expect(result).toEqual({
        model: 'Users',
      });
    });

    it('with alias', async () => {
      const Model = {
        Accounts: 'Accounts',
      };

      const result = getModelAlias({
        AccountFrom: 'Accounts',
        AccountTo: 'Accounts',
      }, Model)('AccountFrom');

      expect(result).toEqual({
        as: 'AccountFrom',
        model: 'Accounts',
      });
    });
  });

  describe('cryptPassword should', () => {
    it('sucessful', async () => {
      const user = {
        password: '123',
        _previousDataValues: {
          password: '1234',
        },
      };

      await cryptPassword(user);

      expect(bcrypt.compareSync('123', user.password)).toBe(true);
    });
  });
});
