import resources from '../../src/services/resources';

describe('resourcers', () => {
  it('create a routers', () => {
    const router = {
      get: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
      put: jest.fn(),
    };
    const controller = {
      list: jest.fn(),
      create: jest.fn(),
      get: jest.fn(),
      destroy: jest.fn(),
      update: jest.fn(),
    };
    resources('model', {
      router,
      controller,
    });

    expect(router.get).toBeCalled();
    expect(router.post).toBeCalled();
    expect(router.delete).toBeCalled();
    expect(router.put).toBeCalled();

    expect(router.get.mock.calls[0][0]).toBe('model');
    expect(router.post.mock.calls[0][0]).toBe('model');
    expect(router.get.mock.calls[1][0]).toBe('model/:id');
    expect(router.delete.mock.calls[0][0]).toBe('model/:id');
    expect(router.put.mock.calls[0][0]).toBe('model/:id');

    expect(router.get.mock.calls[0][1]).toEqual(controller.list);
    expect(router.post.mock.calls[0][1]).toEqual(controller.create);
    expect(router.get.mock.calls[1][1]).toEqual(controller.get);
    expect(router.delete.mock.calls[0][1]).toEqual(controller.destroy);
    expect(router.put.mock.calls[0][1]).toEqual(controller.update);
  });
});
