import Account from '../../src/services/AccountService';
import { Accounts } from '../../src/models';

jest.mock('../../src/models', () => ({
  Accounts: {
    create: jest.fn().mockReturnValue(true),
    findAll: jest.fn().mockResolvedValue([
      {
        id: 1,
        UserId: 1,
        name: 'Carteira',
        type: 'wallet',
        initalValue: 10.13,
        createdAt: '2018-08-09 02:02:39',
        updatedAt: '2018-08-09 02:02:39',
      },
    ]),
    findAndCountAll: jest.fn().mockResolvedValue({ count: 1 }),
    findById: jest.fn().mockResolvedValue({
      id: 1,
      UserId: 1,
      name: 'Carteira',
      type: 'wallet',
      initalValue: 10.13,
      createdAt: '2018-08-09 02:02:39',
      updatedAt: '2018-08-09 02:02:39',
      update: jest.fn().mockResolvedValue(true),
    }),
    destroy: jest.fn().mockReturnValue(true),
  },
}));

describe('AccountService', () => {
  let resMock;

  beforeEach(() => {
    resMock = {
      body: {},
      params: {},
    };
  });

  it('create', async () => {
    const body = {
      name: 'Carteira',
      type: 'wallet',
      initalValue: 10.13,
    };
    resMock.body = body;

    const result = await Account.create(resMock);

    expect(Accounts.create.mock.calls[0][0]).toEqual(body);
    expect(result).toEqual(true);
  });

  it('list', async () => {
    const result = await Account.list(resMock);
    expect(Accounts.findAll.mock.calls[0][0]).toEqual({
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
          name: 'Carteira',
          type: 'wallet',
          initalValue: 10.13,
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

    const result = await Account.get(resMock);
    expect(Accounts.findById.mock.calls[0][0]).toBe(1);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('UserId');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('type');
    expect(result).toHaveProperty('initalValue');
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');

    expect(result.id).toBe(1);
    expect(result.UserId).toBe(1);
    expect(result.name).toBe('Carteira');
    expect(result.type).toBe('wallet');
    expect(result.initalValue).toBe(10.13);
    expect(result.createdAt).toBe('2018-08-09 02:02:39');
    expect(result.updatedAt).toBe('2018-08-09 02:02:39');
  });

  it('update', async () => {
    const body = {
      UserId: 1,
      name: 'Wallet',
      type: 'wallet',
      initalValue: 20,
    };
    resMock.params.id = 1;
    resMock.body = body;

    const result = await Account.update(resMock);
    expect(Accounts.findById.mock.calls[0][0]).toBe(1);

    expect(result).toBe(true);
  });

  it('destroy', async () => {
    resMock.params.id = 1;

    const result = await Account.destroy(resMock);
    expect(Accounts.destroy.mock.calls[0][0]).toEqual({
      where: { id: 1 },
    });

    expect(result).toBe(true);
  });
});
