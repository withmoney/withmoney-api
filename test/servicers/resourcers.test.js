import { Router, mock } from 'express';
import resources from '../../src/services/resources';

jest.mock('express');

describe('resourcers', () => {
  let router;
  let controller;

  beforeAll(() => {
    router = {
      use: jest.fn(),
    };
    controller = {
      list: jest.fn(),
      create: jest.fn(),
      get: jest.fn(),
      destroy: jest.fn(),
      update: jest.fn(),
    };
  });

  it('test routerBuilder', () => {
    resources('model', {
      router,
      controller,
    });

    expect(Router).toBeCalled();

    expect(mock.get).toBeCalled();
    expect(mock.post).toBeCalled();
    expect(mock.delete).toBeCalled();
    expect(mock.put).toBeCalled();

    expect(mock.get.mock.calls[0][0]).toBe('/');
    expect(mock.post.mock.calls[0][0]).toBe('/');
    expect(mock.get.mock.calls[1][0]).toBe('/:id');
    expect(mock.delete.mock.calls[0][0]).toBe('/:id');
    expect(mock.put.mock.calls[0][0]).toBe('/:id');

    expect(mock.get.mock.calls[0][1]).toEqual(controller.list);
    expect(mock.post.mock.calls[0][1]).toEqual(controller.create);
    expect(mock.get.mock.calls[1][1]).toEqual(controller.get);
    expect(mock.delete.mock.calls[0][1]).toEqual(controller.destroy);
    expect(mock.put.mock.calls[0][1]).toEqual(controller.update);
  });

  describe('test router.use', () => {
    it('use function', () => {
      resources('model', {
        router,
        controller,
      });

      expect(router.use).toBeCalled();
    });

    it('without middleware', () => {
      resources('model', {
        router,
        controller,
      });

      expect(router.use.mock.calls[2][0]).toEqual('model');
      expect(router.use.mock.calls[2][1]).toEqual(mock);
    });

    it('with middleware', () => {
      const middleware = jest.fn();

      resources('model', {
        router,
        controller,
        middleware,
      });

      expect(router.use.mock.calls[3][0]).toEqual('model');
      expect(router.use.mock.calls[3][1]).toEqual(middleware);
      expect(router.use.mock.calls[3][2]).toEqual(mock);
    });
  });
});
