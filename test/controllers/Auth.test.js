/* eslint max-len: "off" */
import Auth from '../../src/controllers/Auth';
import truncate from '../truncate';
import userFacture from '../factures/Users';
import { sequelize } from '../../src/models';

describe('Auth Controller', () => {
  let userBen;
  let reqMock;
  let resMock;

  beforeAll(async () => {
    await truncate();
    userBen = await userFacture({
      name: 'ben',
      email: 'ben@domain.com',
      password: '123456',
      enabled: true,
    });
    await userFacture({
      name: 'will',
      email: 'will@domain.com',
      password: '123456',
      enabled: false,
    });
  });

  beforeEach(() => {
    const status = jest.fn();

    reqMock = {
      query: {},
      params: {},
      body: {},
    };
    resMock = {
      status,
      send: jest.fn(),
      json: jest.fn(),
    };

    status.mockReturnValue(resMock);
  });

  afterAll(() => {
    sequelize.close();
  });

  describe('login', () => {
    it('find user', async () => {
      reqMock.body = {
        email: 'ben@domain.com',
        password: '123456',
      };

      await Auth.login(reqMock, resMock);

      expect(resMock.json).toBeCalled();

      const response = resMock.json.mock.calls[0][0];

      expect(response).toHaveProperty('success');
      expect(response).toHaveProperty('token');
      expect(response).toHaveProperty('payload');

      expect(response.success).toBe(true);
      expect(response.payload.id).toBe(userBen.id);
      expect(response.payload.name).toBe(userBen.name);
      expect(response.payload.email).toBe(userBen.email);
    });

    describe('catch error:', () => {
      it('on User not found', async () => {
        reqMock.body = {
          email: 'tim@domain.com',
          password: '123456',
        };

        await Auth.login(reqMock, resMock);

        expect(resMock.status).toBeCalled();
        expect(resMock.json).toBeCalled();
        expect(resMock.status.mock.calls[0][0]).toEqual(401);
        expect(resMock.json.mock.calls[0][0]).toEqual({
          success: false,
          message: 'Authentication failed. User not found.',
        });
      });

      it('on User are not enabled', async () => {
        reqMock.body = {
          email: 'will@domain.com',
          password: '123456',
        };

        await Auth.login(reqMock, resMock);

        expect(resMock.status).toBeCalled();
        expect(resMock.json).toBeCalled();
        expect(resMock.status.mock.calls[0][0]).toEqual(401);
        expect(resMock.json.mock.calls[0][0]).toEqual({
          success: false,
          message: 'Authentication failed. User are not enabled.',
        });
      });

      it('on User wrong password', async () => {
        reqMock.body = {
          email: 'ben@domain.com',
          password: '12345679',
        };

        await Auth.login(reqMock, resMock);

        expect(resMock.status).toBeCalled();
        expect(resMock.json).toBeCalled();
        expect(resMock.status.mock.calls[0][0]).toEqual(401);
        expect(resMock.json.mock.calls[0][0]).toEqual({
          success: false,
          message: 'Authentication failed. Wrong password.',
        });
      });
    });
  });
});
