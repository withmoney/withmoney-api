import Service from './Service';

const ACTIONS = ['create', 'get', 'list', 'destroy', 'update'];

const creatorService = (model, {
  only = ACTIONS,
  definitions = {},
  filters = {},
  custom = {},
  fields = ['id'],
}) => {
  const methods = {};

  only.forEach((action) => {
    methods[action] = req => Service[action](req, model, { definitions, filters });
  });

  return {
    ...methods,
    ...custom,
  };
};

export default creatorService;
