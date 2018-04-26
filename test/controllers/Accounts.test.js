import iconv from 'iconv-lite';
import encodings from 'iconv-lite/encodings';
import { sequelize, Accounts } from '../../src/models';
import * as Controller from '../../src/controllers/Accounts';
import truncate from '../truncate';
import usersFacture from '../factures/Users';
import accountsFacture from '../factures/Accounts';
import { EXCEPTION_NOT_FOUND } from '../../src/errors';

iconv.encodings = encodings;

let reqMock = {
  query: {},
};
let resMock = {
  json: jest.fn(),
};

describe('Accounts Controller should', () => {
  let user;
  let account;

  beforeAll(async () => {
    await truncate();
    user = await usersFacture();
    account = await accountsFacture({ userId: user.id });

    account = await Accounts.findById(account.id);
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

  afterAll(() => {
    sequelize.close();
  });

  it('list accounts', async () => {
    await Controller.list(reqMock, resMock);
    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];

    expect(response).toHaveProperty('data');
    expect(response).toHaveProperty('pagination');
    expect(response.data.length).toBeTruthy();
    expect(response.data[0].toJSON()).toEqual(account.toJSON());
    expect(response.pagination).toEqual({
      currentPage: 1,
      nextPage: null,
      perPage: 100,
      previousPage: null,
      totalItems: 1,
      totalPages: 1,
    });
  });

  it('create account', async () => {
    const body = {
      userId: user.id,
      name: 'bank one',
      initalValue: 100.99,
      type: 'wallet',
    };

    reqMock.body = body;

    await Controller.create(reqMock, resMock);

    let accountCreated = resMock.json.mock.calls[0][0];
    accountCreated = accountCreated.toJSON();

    expect(body.name).toEqual(accountCreated.name);
    expect(body.initalValue).toEqual(accountCreated.initalValue);
    expect(body.type).toEqual(accountCreated.type);
  });

  it('get account', async () => {
    reqMock.params.id = account.id;

    await Controller.get(reqMock, resMock);
    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];
    expect(response).toEqual(account);
  });

  it('get account not find account', async () => {
    reqMock.params.id = 99999999;

    await Controller.get(reqMock, resMock);

    expect(resMock.status).toBeCalled();
    expect(resMock.send).toBeCalled();
    expect(resMock.status.mock.calls[0][0]).toEqual(404);
    expect(resMock.send.mock.calls[0][0]).toEqual(EXCEPTION_NOT_FOUND);
  });

  it('update account', async () => {
    reqMock.params.id = account.id;
    reqMock.body = {
      name: 'BankTwo',
      userId: user.id,
      initalValue: 40.7,
      type: 'investing',
    };

    await Controller.update(reqMock, resMock);

    account = await Accounts.findById(account.id);

    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];

    expect(response).toBeTruthy();
    expect(response.toJSON()).toHaveProperty('name');
    expect(response.toJSON()).toHaveProperty('userId');
    expect(response.toJSON()).toHaveProperty('initalValue');
    expect(response.toJSON()).toHaveProperty('type');
    expect(response.name).toEqual(account.name);
    expect(response.userId).toEqual(account.userId);
    expect(response.toJSON().initalValue).toEqual(account.initalValue);
    expect(response.type).toEqual(account.type);
  });

  it('delete account', async () => {
    reqMock.params.id = account.id;

    await Controller.destroy(reqMock, resMock);

    expect(resMock.status).toBeCalled();
    expect(resMock.send).toBeCalled();
    expect(resMock.send).toBeCalled();
    expect(resMock.status.mock.calls[0][0]).toEqual(204);
  });
});
