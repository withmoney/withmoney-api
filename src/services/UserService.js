import {
  createService,
  type,
  Service,
} from 'fastexpress';
import database, { Users as Model } from '../models';
import { userFilters as filters } from '../definitionsFilters';

export const definitions = {
  name: type.stringType,
  email: type.stringType,
  password: type.stringType,
  enabled: type.boolType,
};

const accounts = ({ params, query }, model, configs) => Service.get({
  params,
  query: {
    ...query,
    batch: 'Accounts',
  },
}, model, configs);

export default createService(Model, {
  definitions,
  options: { filters },
  database,
  custom: { accounts },
});
