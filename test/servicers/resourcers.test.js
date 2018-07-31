import { resources, resourcesAuth } from '../../src/services/resources';

jest.mock('express');

describe('resourcers', () => {
  let router;
  let controller;

  beforeEach(() => {
    router = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    };
    controller = {
      list: jest.fn(),
      create: jest.fn(),
      get: jest.fn(),
      destroy: jest.fn(),
      update: jest.fn(),
    };
  });

  describe('resources function should', () => {
    it('works', () => {
      resources('model', {
        router,
        controller,
      });

      expect(router.get.mock.calls[0][0]).toEqual('model/');
      expect(router.post.mock.calls[0][0]).toEqual('model/');
      expect(router.get.mock.calls[1][0]).toEqual('model/:id');
      expect(router.delete.mock.calls[0][0]).toEqual('model/:id');
      expect(router.put.mock.calls[0][0]).toEqual('model/:id');

      expect(router.get.mock.calls[0][1]).toEqual(controller.list);
      expect(router.post.mock.calls[0][1]).toEqual(controller.create);
      expect(router.get.mock.calls[1][1]).toEqual(controller.get);
      expect(router.delete.mock.calls[0][1]).toEqual(controller.destroy);
      expect(router.put.mock.calls[0][1]).toEqual(controller.update);
    });
  });

  describe('resourcesAuth function should', () => {
    it('with middleware', () => {
      const middleware = jest.fn();

      resourcesAuth('model', {
        router,
        controller,
        middleware,
      });

      expect(router.get.mock.calls[0][0]).toEqual('model/');
      expect(router.post.mock.calls[0][0]).toEqual('model/');
      expect(router.get.mock.calls[1][0]).toEqual('model/:id');
      expect(router.delete.mock.calls[0][0]).toEqual('model/:id');
      expect(router.put.mock.calls[0][0]).toEqual('model/:id');

      expect(router.get.mock.calls[0][1]).toEqual(middleware);
      expect(router.post.mock.calls[0][1]).toEqual(middleware);
      expect(router.get.mock.calls[1][1]).toEqual(middleware);
      expect(router.delete.mock.calls[0][1]).toEqual(middleware);
      expect(router.put.mock.calls[0][1]).toEqual(middleware);

      expect(router.get.mock.calls[0][2]).toEqual(controller.list);
      expect(router.post.mock.calls[0][2]).toEqual(controller.create);
      expect(router.get.mock.calls[1][2]).toEqual(controller.get);
      expect(router.delete.mock.calls[0][2]).toEqual(controller.destroy);
      expect(router.put.mock.calls[0][2]).toEqual(controller.update);
    });
  });
});
