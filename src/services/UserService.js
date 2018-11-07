import {
  createService,
  type,
} from 'fastexpress';
import database, { Users as Model } from '../models';
import { userFilters as filters } from '../definitionsFilters';

export const definitions = {
  name: type.stringType,
  email: type.stringType,
  password: type.stringType,
  enabled: type.boolType,
};

export default createService(Model, {
  definitions,
  options: { filters },
  database,
});
