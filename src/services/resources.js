export const resources = (prefix, { router, controller }) => {
  router.get(`${prefix}/`, controller.list);
  router.post(`${prefix}/`, controller.create);
  router.get(`${prefix}/:id`, controller.get);
  router.delete(`${prefix}/:id`, controller.destroy);
  router.put(`${prefix}/:id`, controller.update);
};

export const resourcesAuth = (prefix, { router, middleware, controller }) => {
  router.get(`${prefix}/`, middleware, controller.list);
  router.post(`${prefix}/`, middleware, controller.create);
  router.get(`${prefix}/:id`, middleware, controller.get);
  router.delete(`${prefix}/:id`, middleware, controller.destroy);
  router.put(`${prefix}/:id`, middleware, controller.update);
};

export default resources;
