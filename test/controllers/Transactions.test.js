import iconv from 'iconv-lite';
import encodings from 'iconv-lite/encodings';
import { Transactions } from '../../src/models';
import * as Controller from '../../src/controllers/Transactions';
import truncate from '../truncate';
import usersFacture from '../factures/Users';
import accountsFacture from '../factures/Accounts';
import transactionsFacture from '../factures/Transactions';
// import { EXCEPTION_NOT_FOUND } from '../../src/errors';

iconv.encodings = encodings;

let reqMock = {
  query: {},
};
let resMock = {
  json: jest.fn(),
};

describe('Transactions Controller should', async () => {
  let user;
  let account;
  let transaction;

  beforeEach(async () => {
    await truncate();
    user = await usersFacture();
    account = await accountsFacture({ userId: user.id });
    transaction = await transactionsFacture({ accountId: account.id });

    transaction = await Transactions.findById(transaction.id);
  // });

  // beforeEach(() => {
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

  afterEach(async () => {
    await truncate();
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

  it('create transaction 1', async () => {
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
});
