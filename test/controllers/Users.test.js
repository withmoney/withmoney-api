import iconv from 'iconv-lite';
import encodings from 'iconv-lite/encodings';
import * as Users from '../../src/controllers/Users';

iconv.encodings = encodings;

const reqMock = {
  query: {},
};
const resMock = {
  json: jest.fn(),
};

it('should work', async () => {
  await Users.list(reqMock, resMock);
  expect(resMock.json).toBeCalled();
  expect(resMock.json.mock.calls[0][0]).toEqual({
    data: [{
      createdAt: new Date('2018-04-04T23:18:29.000Z'),
      id: 1,
      name: 'David',
      updatedAt: new Date('2018-04-04T23:18:29.000Z'),
    }],
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
