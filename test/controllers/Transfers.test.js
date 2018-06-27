import iconv from 'iconv-lite';
import encodings from 'iconv-lite/encodings';
import { sequelize, Transfers, Accounts } from '../../src/models';
import Controller from '../../src/controllers/Transfers';
import truncate from '../truncate';
import usersFacture from '../factures/Users';
import accountsFacture from '../factures/Accounts';
import transfersFacture from '../factures/Transfers';
import { EXCEPTION_NOT_FOUND } from '../../src/errors';
import { fields as transferFields } from '../../src/services/TransferService';
import { clearData } from '../../src/utils/model';

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
    accountOne = await accountsFacture({ name: 'bank one', UserId: user.id });
    accountTwo = await accountsFacture({ name: 'bank two', UserId: user.id });

    transfer = await transfersFacture({
      AccountFromId: accountOne.id,
      AccountToId: accountTwo.id,
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

  it.only('list transfers', async () => {
    await Controller.list(reqMock, resMock);
    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];

    expect(response).toHaveProperty('data');
    expect(response).toHaveProperty('pagination');
    expect(response.data.length).toBeTruthy();
    expect(response.data).toEqual(clearData([transfer], transferFields));
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

    expect(response).toEqual({
      data: clearData(
        [
          {
            id: transfer.id,
            value: transfer.value,
            transferDate: transfer.transferDate,
            updatedAt: transfer.updatedAt,
            createdAt: transfer.createdAt,
            AccountFromId: transfer.AccountFromId,
            AccountToId: transfer.AccountToId,
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
        transferFields,
      ),
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
      AccountFromId: accountOne.id,
      AccountToId: accountTwo.id,
      value: '100.99',
      transferDate: '2018-04-02',
    };

    reqMock.body = body;

    await Controller.create(reqMock, resMock);

    let transferCreated = resMock.json.mock.calls[0][0];
    transferCreated = transferCreated.toJSON();

    expect(body.AccountFromId).toEqual(transferCreated.AccountFromId);
    expect(body.AccountToId).toEqual(transferCreated.AccountToId);
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
    const body = {
      AccountFromId: accountOne.id,
      AccountToId: accountTwo.id,
      value: 56.1,
      transferDate: '2018-04-05',
    };
    reqMock.body = body;

    await Controller.update(reqMock, resMock);

    transfer = await Transfers.findById(transfer.id);

    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];

    expect(response).toBeTruthy();
    expect(response.toJSON()).toHaveProperty('AccountFromId');
    expect(response.toJSON()).toHaveProperty('AccountToId');
    expect(response.toJSON()).toHaveProperty('value');
    expect(response.toJSON()).toHaveProperty('transferDate');
    expect(response.AccountFromId).toEqual(body.AccountFromId);
    expect(response.AccountToId).toEqual(body.AccountToId);
    expect(response.value).toEqual(body.value);
    expect(response.transferDate).toEqual(body.transferDate);
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
