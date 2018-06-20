import iconv from 'iconv-lite';
import encodings from 'iconv-lite/encodings';
import Service from '../../src/utils/Service';
import { EXCEPTION_NOT_FOUND, EXCEPTION_UNPROCESSABLE_ENTITY } from '../../src/errors';

iconv.encodings = encodings;

let reqMock = {
  query: {},
};
let resMock = {
  json: jest.fn(),
};

describe('Accounts Service should', () => {
  const definitions = {
    name: {
      validation: () => true,
    },
  };

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

  describe('simulate error on', () => {
    it('list', async () => {
      const modelMock = {
        findAll: jest.fn().mockReturnValue(Promise.reject(new Error('Async error'))),
      };

      try {
        await Service.list(reqMock, modelMock, {});
      } catch (e) {
        expect(e.message).toBe(EXCEPTION_NOT_FOUND);
      }
    });

    it('get', async () => {
      const modelMock = {
        findById: jest.fn().mockReturnValue(Promise.resolve(null)),
      };

      try {
        await Service.get(reqMock, modelMock, {});
      } catch (e) {
        expect(e.message).toBe(EXCEPTION_NOT_FOUND);
      }
    });

    it('create', async () => {
      reqMock.body = {
        name: 'David Costa',
      };

      const modelMock = {
        create: jest.fn().mockReturnValue(Promise.reject(new Error('Async error'))),
      };

      try {
        await Service.create(reqMock, modelMock, { definitions });
      } catch (e) {
        expect(e.message).toBe(EXCEPTION_UNPROCESSABLE_ENTITY);
      }
    });

    it('update with wrong user', async () => {
      const modelMock = {
        findById: () => Promise.resolve(false),
      };

      try {
        await Service.update(reqMock, modelMock, { definitions });
      } catch (e) {
        expect(e.message).toBe(EXCEPTION_NOT_FOUND);
      }
    });

    it('update with corrent user', async () => {
      const modelMock = {
        findById: () => true,
        update: () => Promise.reject(new Error('Async error')),
      };

      try {
        await Service.update(reqMock, modelMock, { definitions });
      } catch (e) {
        expect(e.message).toBe(EXCEPTION_UNPROCESSABLE_ENTITY);
      }
    });

    it('destroy', async () => {
      const modelMock = {
        destroy: jest.fn().mockReturnValue(Promise.reject(new Error('Async error'))),
      };

      try {
        await Service.destroy(reqMock, modelMock, { definitions });
      } catch (e) {
        expect(e.message).toBe(EXCEPTION_UNPROCESSABLE_ENTITY);
      }
    });
  });
});
