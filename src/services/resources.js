import { Router } from 'express';

const routerBuilder = Router();

const resources = (prefix, { router, controller, middleware }) => {
  routerBuilder.get('/', controller.list);
  routerBuilder.post('/', controller.create);
  routerBuilder.get('/:id', controller.get);
  routerBuilder.delete('/:id', controller.destroy);
  routerBuilder.put('/:id', controller.update);

  if (middleware) {
    router.use(prefix, middleware, routerBuilder);
  } else {
    router.use(prefix, routerBuilder);
  }
};

export const resourcesAuth = (prefix, { router, middleware, controller }) => {
  router.get(`${prefix}/`, middleware, controller.list);
  router.post(`${prefix}/`, middleware, controller.create);
  router.get(`${prefix}/:id`, middleware, controller.get);
  router.delete(`${prefix}/:id`, middleware, controller.destroy);
  router.put(`${prefix}/:id`, middleware, controller.update);
};

export default resources;
