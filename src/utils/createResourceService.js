import Service from './Service';
import { ACTIONS } from '../definitions';

const createResourceService = (model, {
  only = ACTIONS,
  definitions = {},
  options = {},
  custom = {},
}) => {
  const methods = {};

  only.forEach((action) => {
    methods[action] = req => Service[action](req, model, { definitions, options });
  });

  return {
    ...methods,
    ...custom,
  };
};

export default createResourceService;
