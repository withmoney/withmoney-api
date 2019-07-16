import User from '../../src/services/UserService';
import { Users } from '../../src/models';

jest.mock('../../src/models', () => ({
  Users: {
    create: jest.fn().mockReturnValue(true),
    findAll: jest.fn().mockResolvedValue([
      {
        id: 1,
        name: 'david',
        email: 'davidcostadev@gmail.com',
        password: '123',
        enabled: true,
        createdAt: '2018-08-09 02:02:39',
        updatedAt: '2018-08-09 02:02:39',
      },
    ]),
    findAndCountAll: jest.fn().mockResolvedValue({ count: 1 }),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      name: 'david',
      email: 'davidcostadev@gmail.com',
      password: '123',
      enabled: true,
      createdAt: '2018-08-09 02:02:39',
      updatedAt: '2018-08-09 02:02:39',
      update: jest.fn().mockResolvedValue(true),
    }),
    findByPk: jest.fn().mockResolvedValue({
      id: 1,
      name: 'david',
      email: 'davidcostadev@gmail.com',
      password: '123',
      enabled: true,
      createdAt: '2018-08-09 02:02:39',
      updatedAt: '2018-08-09 02:02:39',
      update: jest.fn().mockResolvedValue(true),
    }),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      name: 'david',
      email: 'davidcostadev@gmail.com',
      password: '123',
      enabled: true,
      createdAt: '2018-08-09 02:02:39',
      updatedAt: '2018-08-09 02:02:39',
      update: jest.fn().mockResolvedValue(true),
    }),
    destroy: jest.fn().mockReturnValue(true),
  },
}));

describe('UserService', () => {
  let resMock;

  beforeEach(() => {
    resMock = {
      body: {},
      params: {},
      query: {},
    };
  });

  it('create', async () => {
    const body = {
      name: 'David Costa',
      email: 'davidcostadev@gmail.com',
      password: '123456',
      enabled: true,
    };
    resMock.body = body;

    const result = await User.create(resMock);

    expect(Users.create.mock.calls[0][0]).toEqual(body);
    expect(result).toEqual(true);
  });

  it('list', async () => {
    const result = await User.list(resMock);
    expect(Users.findAll.mock.calls[0][0]).toEqual({
      limit: 100,
      offset: 0,
      order: [['id', 'DESC']],
      where: {},
    });

    expect(result).toEqual({
      data: [
        {
          id: 1,
          name: 'david',
          email: 'davidcostadev@gmail.com',
          password: '123',
          enabled: true,
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

    const result = await User.get(resMock);
    expect(Users.findOne.mock.calls[0][0]).toEqual({ where: { id: 1 } });

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('email');
    expect(result).toHaveProperty('password');
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');

    expect(result.id).toBe(1);
    expect(result.name).toBe('david');
    expect(result.email).toBe('davidcostadev@gmail.com');
    expect(result.password).toBe('123');
    expect(result.createdAt).toBe('2018-08-09 02:02:39');
    expect(result.updatedAt).toBe('2018-08-09 02:02:39');
  });

  it('update', async () => {
    const body = {
      name: 'David Costa',
      email: 'davidcostadev@gmail.com',
      password: '123456',
      enabled: true,
    };
    resMock.params.id = 1;
    resMock.body = body;

    const result = await User.update(resMock);
    expect(Users.findByPk.mock.calls[0][0]).toBe(1);

    expect(result).toBe(true);
  });

  it('destroy', async () => {
    resMock.params.id = 1;

    const result = await User.destroy(resMock);
    expect(Users.destroy.mock.calls[0][0]).toEqual({
      where: { id: 1 },
    });

    expect(result).toBe(true);
  });
});
