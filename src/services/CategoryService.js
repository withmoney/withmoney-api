import {
  createService,
  type,
} from 'fastexpress';
import database, { Categories as Model } from '../models';
import { categoryFilters as filters } from '../definitionsFilters';

export const definitions = {
  UserId: type.numberType,
  name: type.stringType,
  type: type.stringType,
};

export default createService(Model, {
  definitions,
  options: { filters },
  database,
});
