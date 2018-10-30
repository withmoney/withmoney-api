import iconv from 'iconv-lite';
import encodings from 'iconv-lite/encodings';
import { sequelize, Categories, Transactions } from '../../src/models';
import Controller from '../../src/controllers/Categories';
import truncate from '../truncate';
import usersFacture from '../factures/Users';
import categoriesFacture from '../factures/Categories';
import transactionsFacture from '../factures/Transactions';
import accountsFacture from '../factures/Accounts';
import { EXCEPTION_NOT_FOUND } from '../../src/errors';

iconv.encodings = encodings;

let reqMock = {
  query: {},
};
let resMock = {
  json: jest.fn(),
};

describe('Categories Controller should', () => {
  let user;
  let category;
  let transaction;
  let account;

  beforeAll(async () => {
    await truncate();
    user = await usersFacture();
    account = await accountsFacture({ UserId: user.id });
    category = await categoriesFacture({ UserId: user.id });
    transaction = await transactionsFacture({
      UserId: user.id,
      CategoryId: category.id,
      AccountId: account.id,
    });

    category = await Categories.findById(category.id);
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

  it('list categories', async () => {
    await Controller.list(reqMock, resMock);
    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];

    expect(response).toHaveProperty('data');
    expect(response).toHaveProperty('pagination');
    expect(response.data.length).toBeTruthy();
    expect(response.data).toEqual(JSON.parse(JSON.stringify([category])));
    expect(response.pagination).toEqual({
      currentPage: 1,
      nextPage: null,
      perPage: 100,
      previousPage: null,
      totalItems: 1,
      totalPages: 1,
    });
  });

  it('list categories with batch', async () => {
    reqMock.query = {
      batch: 'Transactions',
    };

    await Controller.list(reqMock, resMock);
    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];

    expect(response).toHaveProperty('data');
    expect(response).toHaveProperty('pagination');
    expect(response.data.length).toBeTruthy();
    expect(response.data).toEqual(JSON.parse(JSON.stringify([{
      ...category.toJSON(),
      Transactions: [transaction],
    }])));
    expect(response.pagination).toEqual({
      currentPage: 1,
      nextPage: null,
      perPage: 100,
      previousPage: null,
      totalItems: 1,
      totalPages: 1,
    });
  });

  it('create category', async () => {
    const body = {
      UserId: user.id,
      name: 'Salario',
      type: 'in',
    };

    reqMock.body = body;

    await Controller.create(reqMock, resMock);

    let categoryCreated = resMock.json.mock.calls[0][0];
    categoryCreated = categoryCreated.toJSON();

    expect(body.UserId).toEqual(categoryCreated.UserId);
    expect(body.name).toEqual(categoryCreated.name);
    expect(body.type).toEqual(categoryCreated.type);
  });

  it('get category', async () => {
    reqMock.params.id = category.id;

    await Controller.get(reqMock, resMock);
    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];
    expect(response).toEqual(category);
  });

  it('get category not find category', async () => {
    reqMock.params.id = 99999999;

    await Controller.get(reqMock, resMock);

    expect(resMock.status).toBeCalled();
    expect(resMock.send).toBeCalled();
    expect(resMock.status.mock.calls[0][0]).toEqual(404);
    expect(resMock.send.mock.calls[0][0]).toEqual(EXCEPTION_NOT_FOUND);
  });

  it('update category', async () => {
    reqMock.params.id = category.id;
    const body = {
      name: 'Lanche',
      UserId: user.id,
      type: 'out',
    };
    reqMock.body = body;

    await Controller.update(reqMock, resMock);

    category = await Categories.findById(category.id);

    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];

    expect(response).toBeTruthy();
    expect(response.toJSON()).toHaveProperty('name');
    expect(response.toJSON()).toHaveProperty('UserId');
    expect(response.toJSON()).toHaveProperty('type');
    expect(response.name).toEqual(body.name);
    expect(response.UserId).toEqual(body.UserId);
    expect(response.type).toEqual(body.type);
  });

  it('delete category', async () => {
    reqMock.params.id = category.id;

    await Controller.destroy(reqMock, resMock);

    expect(resMock.status).toBeCalled();
    expect(resMock.send).toBeCalled();
    expect(resMock.send).toBeCalled();
    expect(resMock.status.mock.calls[0][0]).toEqual(204);
  });
});
