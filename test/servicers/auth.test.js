import bcrypt from 'bcrypt';
import { authenticate } from '../../src/services/auth';
import config from '../../config/envs';

describe('authenticate should', () => {
  let user;
  let Model;

  beforeEach(() => {
    user = {
      id: 1,
      name: 'user',
      email: 'user@domain.com',
      password: bcrypt.hashSync('123', config.BCRYPT_SALT),
      enabled: true,
    };

    Model = {
      findOne: () => Promise.resolve(user),
    };
  });

  it('find user', async () => {
    const body = {
      email: 'email@test.com',
      password: '123',
    };
    const { token, payload } = await authenticate(Model)(body);

    expect(typeof token).toBe('string');
    expect(payload).toHaveProperty('id');
    expect(payload).toHaveProperty('email');
    expect(payload).toHaveProperty('name');
    expect(payload.id).toBe(user.id);
    expect(payload.name).toBe(user.name);
    expect(payload.email).toBe(user.email);
  });

  describe('catch error:', () => {
    it('on database', async () => {
      Model = {
        findOne: () => Promise.reject(new Error('database error')),
      };

      const body = {
        email: 'other@test.com',
        password: '321',
      };

      try {
        await authenticate(Model)(body);
      } catch (e) {
        expect(e.message).toBe('database error');
      }
    });

    it('when don\'t find the user', async () => {
      Model = {
        findOne: () => Promise.resolve(null),
      };

      const body = {
        email: 'other@test.com',
        password: '321',
      };

      try {
        await authenticate(Model)(body);
      } catch (e) {
        expect(e.message).toBe('Authentication failed. User not found.');
      }
    });

    it('when yser are not enabled', async () => {
      Model = {
        findOne: () => Promise.resolve({
          enabled: false,
        }),
      };

      const body = {
        email: 'other@test.com',
      };

      try {
        await authenticate(Model)(body);
      } catch (e) {
        expect(e.message).toBe('Authentication failed. User are not enabled.');
      }
    });

    it('on wrong password', async () => {
      const body = {
        email: 'email@test.com',
        password: 'aaaaa',
      };

      try {
        await authenticate(Model)(body);
      } catch (e) {
        expect(e.message).toBe('Authentication failed. Wrong password.');
      }
    });
  });
});
