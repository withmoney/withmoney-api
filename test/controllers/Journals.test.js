import iconv from 'iconv-lite';
import encodings from 'iconv-lite/encodings';
import { sequelize, Journals } from '../../src/models';
import Controller from '../../src/controllers/Journals';
import truncate from '../truncate';
import usersFacture from '../factures/Users';
import journalsFacture from '../factures/Journals';
import { EXCEPTION_NOT_FOUND } from '../../src/errors';
import { fields as journalFields } from '../../src/services/JournalService';
import { clearData } from '../../src/utils/model';

iconv.encodings = encodings;

let reqMock = {
  query: {},
};
let resMock = {
  json: jest.fn(),
};

describe('Journals Controller should', () => {
  let user;
  let journal;

  beforeAll(async () => {
    await truncate();
    user = await usersFacture();

    journal = await journalsFacture({
      UserId: user.id,
    });

    journal = await Journals.findById(journal.id);
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

  it('list journals', async () => {
    await Controller.list(reqMock, resMock);
    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];

    expect(response).toHaveProperty('data');
    expect(response).toHaveProperty('pagination');
    expect(response.data.length).toBeTruthy();
    expect(response.data).toEqual(clearData([journal], journalFields));
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
    await Controller.list(reqMock, resMock);
    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];

    expect(response).toEqual({
      data: clearData(
        [
          {
            id: journal.id,
            UserId: journal.UserId,
            type: journal.type,
            updatedAt: journal.updatedAt,
            createdAt: journal.createdAt,
          },
        ],
        journalFields,
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

  it('create journal', async () => {
    const body = {
      UserId: user.id,
      tyoe: 'transfers',
    };

    reqMock.body = body;

    await Controller.create(reqMock, resMock);

    let journalCreated = resMock.json.mock.calls[0][0];
    journalCreated = journalCreated.toJSON();

    expect(body.UserId).toEqual(journalCreated.UserId);
    expect(body.type).toEqual(journalCreated.type);
  });

  it('get journal', async () => {
    reqMock.params.id = journal.id;

    await Controller.get(reqMock, resMock);
    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];
    expect(response).toEqual(journal);
  });

  it('get journal not find journal', async () => {
    reqMock.params.id = 99999999;

    await Controller.get(reqMock, resMock);

    expect(resMock.status).toBeCalled();
    expect(resMock.send).toBeCalled();
    expect(resMock.status.mock.calls[0][0]).toEqual(404);
    expect(resMock.send.mock.calls[0][0]).toEqual(EXCEPTION_NOT_FOUND);
  });

  it('update journal', async () => {
    reqMock.params.id = journal.id;
    const body = {
      UserId: user.id,
      type: 'transfers',
    };
    reqMock.body = body;

    await Controller.update(reqMock, resMock);

    journal = await Journals.findById(journal.id);

    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];

    expect(response).toBeTruthy();
    expect(response.toJSON()).toHaveProperty('UserId');
    expect(response.toJSON()).toHaveProperty('type');
    expect(response.UserId).toEqual(body.UserId);
    expect(response.type).toEqual(body.type);
  });

  it('delete journal', async () => {
    reqMock.params.id = journal.id;

    await Controller.destroy(reqMock, resMock);

    expect(resMock.status).toBeCalled();
    expect(resMock.send).toBeCalled();
    expect(resMock.send).toBeCalled();
    expect(resMock.status.mock.calls[0][0]).toEqual(204);
  });
});
