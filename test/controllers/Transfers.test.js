import iconv from 'iconv-lite';
import encodings from 'iconv-lite/encodings';
import { sequelize, Transfers, Accounts } from '../../src/models';
import * as Controller from '../../src/controllers/Transfers';
import truncate from '../truncate';
import usersFacture from '../factures/Users';
import accountsFacture from '../factures/Accounts';
import transfersFacture from '../factures/Transfers';
import { EXCEPTION_NOT_FOUND } from '../../src/errors';

iconv.encodings = encodings;

let reqMock = {
  query: {},
};
let resMock = {
  json: jest.fn(),
};

describe('Transfers Controller should', () => {
  let user;
  let accountOne;
  let accountTwo;
  let transfer;

  beforeAll(async () => {
    await truncate();
    user = await usersFacture();
    accountOne = await accountsFacture({ name: 'bank one', userId: user.id });
    accountTwo = await accountsFacture({ name: 'bank two', userId: user.id });

    transfer = await transfersFacture({
      accountFromId: accountOne.id,
      accountToId: accountTwo.id,
    });

    accountOne = await Accounts.findById(accountOne.id);
    accountTwo = await Accounts.findById(accountTwo.id);
    transfer = await Transfers.findById(transfer.id);
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

  it('list transfers', async () => {
    await Controller.list(reqMock, resMock);
    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];

    expect(response).toHaveProperty('data');
    expect(response).toHaveProperty('pagination');
    expect(response.data.length).toBeTruthy();
    expect(response.data[0].toJSON()).toEqual(transfer.toJSON());
    expect(response.pagination).toEqual({
      currentPage: 1,
      nextPage: null,
      perPage: 100,
      previousPage: null,
      totalItems: 1,
      totalPages: 1,
    });
  });

  it('list users with batch', async () => {
    reqMock.query = {
      batch: 'AccountFrom,AccountTo',
    };

    await Controller.list(reqMock, resMock);
    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];

    response.data[0] = response.data[0].toJSON();

    expect(response).toEqual({
      data: [
        {
          id: transfer.id,
          value: transfer.value,
          transferDate: transfer.transferDate,
          updatedAt: transfer.updatedAt,
          createdAt: transfer.createdAt,
          AccountFromId: transfer.AccountFromId,
          AccountToId: transfer.AccountToId,
          accountFromId: transfer.accountFromId,
          accountToId: transfer.accountToId,
          AccountFrom: {
            id: accountOne.id,
            userId: accountOne.userId,
            UserId: accountOne.UserId,
            createdAt: accountOne.createdAt,
            name: accountOne.name,
            type: accountOne.type,
            updatedAt: accountOne.updatedAt,
            initalValue: accountOne.initalValue,
          },
          AccountTo: {
            id: accountTwo.id,
            userId: accountTwo.userId,
            UserId: accountTwo.UserId,
            createdAt: accountTwo.createdAt,
            name: accountTwo.name,
            type: accountTwo.type,
            updatedAt: accountTwo.updatedAt,
            initalValue: accountTwo.initalValue,
          },
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

  it('create transfer', async () => {
    const body = {
      accountFromId: accountOne.id,
      accountToId: accountTwo.id,
      value: 100.99,
      transferDate: '2018-04-02',
    };

    reqMock.body = body;

    await Controller.create(reqMock, resMock);

    let transferCreated = resMock.json.mock.calls[0][0];
    transferCreated = transferCreated.toJSON();

    expect(body.accountFromId).toEqual(transferCreated.accountFromId);
    expect(body.accountToId).toEqual(transferCreated.accountToId);
    expect(body.value).toEqual(transferCreated.value);
    expect(body.transferDate).toEqual(transferCreated.transferDate);
  });

  it('get transfer', async () => {
    reqMock.params.id = transfer.id;

    await Controller.get(reqMock, resMock);
    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];
    expect(response).toEqual(transfer);
  });

  it('get transfer not find transfer', async () => {
    reqMock.params.id = 99999999;

    await Controller.get(reqMock, resMock);

    expect(resMock.status).toBeCalled();
    expect(resMock.send).toBeCalled();
    expect(resMock.status.mock.calls[0][0]).toEqual(404);
    expect(resMock.send.mock.calls[0][0]).toEqual(EXCEPTION_NOT_FOUND);
  });

  it('update transfer', async () => {
    reqMock.params.id = transfer.id;
    reqMock.body = {
      accountFromId: accountOne.id,
      accountToId: accountTwo.id,
      value: 56.1,
      transferDate: '2018-04-05',
    };

    await Controller.update(reqMock, resMock);

    transfer = await Transfers.findById(transfer.id);

    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];

    expect(response).toBeTruthy();
    expect(response.toJSON()).toHaveProperty('accountFromId');
    expect(response.toJSON()).toHaveProperty('accountToId');
    expect(response.toJSON()).toHaveProperty('value');
    expect(response.toJSON()).toHaveProperty('transferDate');
    expect(response.accountFromId).toEqual(transfer.accountFromId);
    expect(response.accountToId).toEqual(transfer.accountToId);
    expect(response.value).toEqual(transfer.value);
    expect(response.transferDate).toEqual(transfer.transferDate);
  });

  it('delete transfer', async () => {
    reqMock.params.id = transfer.id;

    await Controller.destroy(reqMock, resMock);

    expect(resMock.status).toBeCalled();
    expect(resMock.send).toBeCalled();
    expect(resMock.send).toBeCalled();
    expect(resMock.status.mock.calls[0][0]).toEqual(204);
  });
});
