import Controller from './Controller';

const ACTIONS = ['create', 'get', 'list', 'destroy', 'update'];

const creatorController = (service, { only = ACTIONS, custom = {} } = {}) => {
  const methods = {};

  only.forEach((action) => {
    methods[action] = (req, res) => Controller[action](req, res, service[action]);
  });

  return {
    ...methods,
    ...custom,
  };
};

export default creatorController;
