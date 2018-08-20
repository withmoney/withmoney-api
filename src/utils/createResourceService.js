import Service from './Service';
import { ACTIONS } from '../definitions';

export const serviceDefaultProps = ({
  form,
  fields,
  filters,
  database,
}) => ({
  definitions: form,
  options: { fields, filters },
  database,
});

const createResourceService = (model, {
  only = ACTIONS,
  definitions = {},
  options = {},
  custom = {},
  database,
}) => {
  const methods = {};

  only.forEach((action) => {
    methods[action] = req => Service[action](req, model, { definitions, options, database });
  });

  return {
    ...methods,
    ...custom,
  };
};

export default createResourceService;
