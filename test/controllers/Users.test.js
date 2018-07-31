import iconv from 'iconv-lite';
import encodings from 'iconv-lite/encodings';
import { sequelize, Users, Accounts } from '../../src/models';
import { injectModel } from '../../src/services/inject';
import Controller from '../../src/controllers/Users';
import truncate from '../truncate';
import userFacture from '../factures/Users';
import accountsFacture from '../factures/Accounts';
import { EXCEPTION_NOT_FOUND } from '../../src/errors';
import { fields as userFields } from '../../src/services/UserService';
import { clearData } from '../../src/utils/model';

iconv.encodings = encodings;

let reqMock = {
  query: {},
};
let resMock = {
  json: jest.fn(),
};

describe('Users Controller should', () => {
  let user;
  let userDavid;
  let account;
  let accountTwo;

  beforeAll(async () => {
    await truncate();
    user = await userFacture();

    userDavid = await userFacture({ name: 'david', email: 'david@costa.com' });
    account = await accountsFacture({ UserId: user.id });
    accountTwo = await accountsFacture({ UserId: userDavid.id });

    user = await Users.findById(user.id);
    userDavid = await Users.findById(userDavid.id);
    account = await Accounts.findById(account.id);
    accountTwo = await Accounts.findById(accountTwo.id);
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
      data: clearData([userDavid, user], userFields),
      pagination: {
        currentPage: 1,
        nextPage: null,
        perPage: 100,
        previousPage: null,
        totalItems: 2,
        totalPages: 1,
      },
    });
  });

  it('list users with filter by name', async () => {
    reqMock.query = {
      name: 'david',
    };

    await Controller.list(reqMock, resMock);
    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];

    expect(response.data.length).toEqual(1);
    expect(response).toEqual({
      data: [
        {
          id: userDavid.id,
          createdAt: userDavid.createdAt,
          email: userDavid.email,
          name: userDavid.name,
          enabled: userDavid.enabled,
          password: userDavid.password,
          updatedAt: userDavid.updatedAt,
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

  it('list users with batch', async () => {
    reqMock.query = {
      batch: 'Accounts',
    };

    await Controller.list(reqMock, resMock);
    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];

    expect(response).toEqual({
      data: [
        {
          id: userDavid.id,
          name: userDavid.name,
          email: userDavid.email,
          enabled: userDavid.enabled,
          password: userDavid.password,
          updatedAt: userDavid.updatedAt,
          createdAt: userDavid.createdAt,
          Accounts: [
            {
              id: accountTwo.id,
              userId: accountTwo.userId,
              UserId: accountTwo.UserId,
              createdAt: accountTwo.createdAt,
              name: accountTwo.name,
              type: accountTwo.type,
              updatedAt: accountTwo.updatedAt,
              initalValue: accountTwo.initalValue,
            },
          ],
        },
        {
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          enabled: user.enabled,
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
        totalItems: 2,
        totalPages: 1,
      },
    });
  });

  it('list accounts by user', async () => {
    reqMock.params.id = user.id;

    await Controller.accounts(injectModel(Users))(reqMock, resMock);
    const accounts = await user.getAccounts();

    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];

    expect(response.toJSON()).toEqual({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      enabled: user.enabled,
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

  it('get a error listing accounts by user', async () => {
    const UserModelMock = {
      findById: () => {
        throw new Error('sequelize error');
      },
    };

    await Controller.accounts(UserModelMock)(reqMock, resMock);

    expect(resMock.status).toBeCalled();
    expect(resMock.send).toBeCalled();
    expect(resMock.status.mock.calls[0][0]).toEqual(500);
  });

  it('create user', async () => {
    reqMock.params.id = user.id;
    const body = {
      name: 'David Costa',
      email: 'email@davicosta.com.br',
      password: 'P@ssw0rd',
    };
    reqMock.body = body;

    await Controller.create(reqMock, resMock);
    const userCreated = resMock.json.mock.calls[0][0];
    user = await Users.findById(userCreated.id);

    expect(userCreated.name).toEqual(body.name);
    expect(userCreated.email).toEqual(body.email);
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
      email: 'email@andre.com.br',
    };
    reqMock.body = body;

    await Controller.update(reqMock, resMock);

    user = await Users.findById(user.id);

    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];

    expect(response.name).toEqual(body.name);
    expect(response.email).toEqual(body.email);
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
