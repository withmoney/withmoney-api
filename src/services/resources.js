const resources = (prefix, { router, controller }) => {
  router.get(`${prefix}`, controller.list);
  router.post(`${prefix}`, controller.create);
  router.get(`${prefix}/:id`, controller.get);
  router.delete(`${prefix}/:id`, controller.destroy);
  router.put(`${prefix}/:id`, controller.update);
};

export default resources;
