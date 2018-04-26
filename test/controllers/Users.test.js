import iconv from 'iconv-lite';
import encodings from 'iconv-lite/encodings';
import { sequelize, Users, Accounts } from '../../src/models';
import * as Controller from '../../src/controllers/Users';
import truncate from '../truncate';
import userFacture from '../factures/Users';
import accountsFacture from '../factures/Accounts';
import { EXCEPTION_NOT_FOUND } from '../../src/errors';

iconv.encodings = encodings;

let reqMock = {
  query: {},
};
let resMock = {
  json: jest.fn(),
};

describe('Users Controller should', () => {
  let user;
  let account;

  beforeAll(async () => {
    await truncate();
    user = await userFacture();
    account = await accountsFacture({ userId: user.id });

    user = await Users.findById(user.id);
    account = await Accounts.findById(account.id);
  });

  afterAll(() => {
    sequelize.close();
  });

  beforeEach(async () => {
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

  it('list users', async () => {
    await Controller.list(reqMock, resMock);
    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];
    expect(response).toEqual({
      data: [user],
      pagination: {
        currentPage: 1,
        nextPage: null,
        perPage: 100,
        previousPage: null,
        totalItems: 1,
        totalPages: 1,
      },
    });
  });

  it('list users with batch', async () => {
    reqMock.query = {
      batch: 'Accounts',
    };

    await Controller.list(reqMock, resMock);
    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];

    response.data[0] = response.data[0].toJSON();

    expect(response).toEqual({
      data: [
        {
          id: user.id,
          name: user.name,
          updatedAt: user.updatedAt,
          createdAt: user.createdAt,
          Accounts: [
            {
              id: account.id,
              userId: account.userId,
              UserId: account.UserId,
              createdAt: account.createdAt,
              name: account.name,
              type: account.type,
              updatedAt: account.updatedAt,
              initalValue: account.initalValue,
            },
          ],
        },
      ],
      pagination: {
        currentPage: 1,
        nextPage: null,
        perPage: 100,
        previousPage: null,
        totalItems: 1,
        totalPages: 1,
      },
    });
  });

  it('list accounts by user', async () => {
    reqMock.params.id = user.id;

    await Controller.accounts(reqMock, resMock);
    const accounts = await user.getAccounts();

    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];

    expect(response.toJSON()).toEqual({
      id: user.id,
      name: user.name,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
      Accounts: accounts.map(accountItem => ({
        id: accountItem.id,
        userId: accountItem.userId,
        UserId: accountItem.UserId,
        createdAt: accountItem.createdAt,
        name: accountItem.name,
        type: accountItem.type,
        updatedAt: accountItem.updatedAt,
        initalValue: accountItem.initalValue,
      })),
    });
  });

  it('create user', async () => {
    reqMock.params.id = user.id;
    const body = {
      name: 'David Costa',
    };
    reqMock.body = body;

    await Controller.create(reqMock, resMock);
    const userCreated = resMock.json.mock.calls[0][0];
    user = await Users.findById(userCreated.id);

    expect(userCreated.name).toEqual(body.name);
  });

  it('get user', async () => {
    reqMock.params.id = user.id;

    await Controller.get(reqMock, resMock);
    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];
    expect(response).toEqual(user);
  });

  it('get user not find user', async () => {
    reqMock.params.id = 99999999;

    await Controller.get(reqMock, resMock);

    expect(resMock.status).toBeCalled();
    expect(resMock.send).toBeCalled();
    expect(resMock.status.mock.calls[0][0]).toEqual(404);
    expect(resMock.send.mock.calls[0][0]).toEqual(EXCEPTION_NOT_FOUND);
  });

  it('update user', async () => {
    reqMock.params.id = user.id;
    const body = {
      name: 'André',
    };
    reqMock.body = body;

    await Controller.update(reqMock, resMock);

    user = await Users.findById(user.id);

    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];

    expect(response.name).toEqual(body.name);
  });

  it('delete user', async () => {
    reqMock.params.id = user.id;

    await Controller.destroy(reqMock, resMock);

    expect(resMock.status).toBeCalled();
    expect(resMock.send).toBeCalled();
    expect(resMock.send).toBeCalled();
    expect(resMock.status.mock.calls[0][0]).toEqual(204);
  });
});
