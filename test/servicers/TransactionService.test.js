import Transaction from '../../src/services/TransactionService';
import { Transactions } from '../../src/models';

jest.mock('../../src/models', () => ({
  Transactions: {
    create: jest.fn().mockReturnValue(true),
    findAll: jest.fn().mockResolvedValue([
      {
        id: 1,
        UserId: 1,
        AccountId: 1,
        CategoryId: 1,
        name: 'Almoço',
        type: 'in',
        value: 50,
        isPaid: false,
        transactionDate: '2018-08-01',
        createdAt: '2018-08-09 02:02:39',
        updatedAt: '2018-08-09 02:02:39',
      },
    ]),
    findAndCountAll: jest.fn().mockResolvedValue({ count: 1 }),
    findByPk: jest.fn().mockResolvedValue({
      id: 1,
      UserId: 1,
      AccountId: 1,
      CategoryId: 1,
      name: 'Almoço',
      type: 'in',
      value: 50,
      isPaid: false,
      transactionDate: '2018-08-01',
      createdAt: '2018-08-09 02:02:39',
      updatedAt: '2018-08-09 02:02:39',
      update: jest.fn().mockResolvedValue(true),
    }),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      UserId: 1,
      AccountId: 1,
      CategoryId: 1,
      name: 'Almoço',
      type: 'in',
      value: 50,
      isPaid: false,
      transactionDate: '2018-08-01',
      createdAt: '2018-08-09 02:02:39',
      updatedAt: '2018-08-09 02:02:39',
      update: jest.fn().mockResolvedValue(true),
    }),
    destroy: jest.fn().mockReturnValue(true),
  },
}));

describe('TransactionService', () => {
  let resMock;

  beforeEach(() => {
    resMock = {
      body: {},
      params: {},
    };
  });

  it('create', async () => {
    const body = {
      UserId: 1,
      AccountId: 1,
      CategoryId: 1,
      name: 'Coxinha',
      value: 2,
      type: 'in',
      isPaid: true,
      transactionDate: '2018-08-20',
    };
    resMock.body = body;

    const result = await Transaction.create(resMock);

    expect(Transactions.create.mock.calls[0][0]).toEqual(body);
    expect(result).toEqual(true);
  });

  it('list', async () => {
    const result = await Transaction.list(resMock);
    expect(Transactions.findAll.mock.calls[0][0]).toEqual({
      limit: 100,
      offset: 0,
      order: [['id', 'DESC']],
      where: {},
    });

    expect(result).toEqual({
      data: [
        {
          id: 1,
          UserId: 1,
          AccountId: 1,
          CategoryId: 1,
          name: 'Almoço',
          value: 50,
          type: 'in',
          isPaid: false,
          transactionDate: '2018-08-01',
          createdAt: '2018-08-09 02:02:39',
          updatedAt: '2018-08-09 02:02:39',
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

  it('get', async () => {
    resMock.params.id = 1;

    const result = await Transaction.get(resMock);
    expect(Transactions.findOne.mock.calls[0][0]).toEqual({ where: { id: 1 } });

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('UserId');
    expect(result).toHaveProperty('AccountId');
    expect(result).toHaveProperty('CategoryId');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('value');
    expect(result).toHaveProperty('type');
    expect(result).toHaveProperty('isPaid');
    expect(result).toHaveProperty('transactionDate');
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');

    expect(result.id).toBe(1);
    expect(result.UserId).toBe(1);
    expect(result.AccountId).toBe(1);
    expect(result.CategoryId).toBe(1);
    expect(result.name).toBe('Almoço');
    expect(result.value).toBe(50);
    expect(result.type).toBe('in');
    expect(result.isPaid).toBe(false);
    expect(result.transactionDate).toBe('2018-08-01');
    expect(result.createdAt).toBe('2018-08-09 02:02:39');
    expect(result.updatedAt).toBe('2018-08-09 02:02:39');
  });

  it('update', async () => {
    const body = {
      UserId: 1,
      AccountId: 1,
      CategoryId: 1,
      name: 'Coxinha',
      value: 2,
      type: 'in',
      isPaid: true,
      transactionDate: '2018-08-20',
    };
    resMock.params.id = 1;
    resMock.body = body;

    const result = await Transaction.update(resMock);
    expect(Transactions.findByPk.mock.calls[0][0]).toBe(1);

    expect(result).toBe(true);
  });

  it('destroy', async () => {
    resMock.params.id = 1;

    const result = await Transaction.destroy(resMock);
    expect(Transactions.destroy.mock.calls[0][0]).toEqual({
      where: { id: 1 },
    });

    expect(result).toBe(true);
  });
});
