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

export default resources;
