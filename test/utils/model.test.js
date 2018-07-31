import bcrypt from 'bcrypt';
import { cryptPassword } from '../../src/utils/model';

describe('cryptPassword should', () => {
  it('sucessful', async () => {
    const user = {
      password: '123',
    };

    await cryptPassword(user);

    expect(bcrypt.compareSync('123', user.password)).toBe(true);
  });
});
