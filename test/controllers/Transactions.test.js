import iconv from 'iconv-lite';
import encodings from 'iconv-lite/encodings';
import { sequelize, Transactions } from '../../src/models';
import * as Controller from '../../src/controllers/Transactions';
import truncate from '../truncate';
import usersFacture from '../factures/Users';
import accountsFacture from '../factures/Accounts';
import transactionsFacture from '../factures/Transactions';
import { EXCEPTION_NOT_FOUND } from '../../src/errors';

iconv.encodings = encodings;

let reqMock = {
  query: {},
};
let resMock = {
  json: jest.fn(),
};

describe('Transactions Controller should', () => {
  let user;
  let account;
  let accountTwo;
  let transaction;

  beforeAll(async () => {
    await truncate();
    user = await usersFacture();
    account = await accountsFacture({ userId: user.id });
    accountTwo = await accountsFacture({ name: 'bank two', userId: user.id });
    transaction = await transactionsFacture({ accountId: account.id });

    transaction = await Transactions.findById(transaction.id);
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

  it('list transactions', async () => {
    await Controller.list(reqMock, resMock);
    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];

    expect(response).toHaveProperty('data');
    expect(response).toHaveProperty('pagination');
    expect(response.data.length).toBeTruthy();
    expect(response.data[0].toJSON()).toEqual(transaction.toJSON());
    expect(response.pagination).toEqual({
      currentPage: 1,
      nextPage: null,
      perPage: 100,
      previousPage: null,
      totalItems: 1,
      totalPages: 1,
    });
  });

  it('create transaction', async () => {
    const body = {
      accountId: account.id,
      name: 'headfone',
      value: 100.99,
      type: 'out',
      isPaid: false,
      transationDate: '2018-04-02',
    };

    reqMock.body = body;

    await Controller.create(reqMock, resMock);

    let transactionCreated = resMock.json.mock.calls[0][0];
    transactionCreated = transactionCreated.toJSON();

    expect(body.name).toEqual(transactionCreated.name);
    expect(body.value).toEqual(transactionCreated.value);
    expect(body.type).toEqual(transactionCreated.type);
    expect(body.isPaid).toEqual(transactionCreated.isPaid);
    expect(body.transationDate).toEqual(transactionCreated.transationDate);
  });

  it('get transaction', async () => {
    reqMock.params.id = transaction.id;

    await Controller.get(reqMock, resMock);
    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];
    expect(response).toEqual(transaction);
  });

  it('get transaction not find transaction', async () => {
    reqMock.params.id = 99999999;

    await Controller.get(reqMock, resMock);

    expect(resMock.status).toBeCalled();
    expect(resMock.send).toBeCalled();
    expect(resMock.status.mock.calls[0][0]).toEqual(404);
    expect(resMock.send.mock.calls[0][0]).toEqual(EXCEPTION_NOT_FOUND);
  });

  it('update transaction', async () => {
    reqMock.params.id = transaction.id;
    reqMock.body = {
      name: 'Bola',
      accountId: accountTwo.id,
      value: 40.7,
      isPaid: true,
      transationDate: '2018-04-21',
    };

    await Controller.update(reqMock, resMock);

    transaction = await Transactions.findById(transaction.id);

    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];

    expect(response).toBeTruthy();
    expect(response.toJSON()).toHaveProperty('name');
    expect(response.toJSON()).toHaveProperty('accountId');
    expect(response.toJSON()).toHaveProperty('value');
    expect(response.toJSON()).toHaveProperty('isPaid');
    expect(response.toJSON()).toHaveProperty('transationDate');
    expect(response.name).toEqual(transaction.name);
    expect(response.accountId).toEqual(transaction.accountId);
    expect(response.value).toEqual(transaction.value);
    expect(response.isPaid).toEqual(transaction.isPaid);
    expect(response.transationDate).toEqual(transaction.transationDate);
  });

  it('delete transaction', async () => {
    reqMock.params.id = transaction.id;

    await Controller.destroy(reqMock, resMock);

    expect(resMock.status).toBeCalled();
    expect(resMock.send).toBeCalled();
    expect(resMock.send).toBeCalled();
    expect(resMock.status.mock.calls[0][0]).toEqual(204);
  });
});
