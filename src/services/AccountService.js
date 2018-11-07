import { createService, type } from 'fastexpress';
import database, { Accounts as Model } from '../models';
import { accountFilters as filters } from '../definitionsFilters';

export const definitions = {
  UserId: type.numberType,
  name: type.stringType,
  type: type.stringType,
  initalValue: type.floatType,
};

export default createService(Model, {
  definitions,
  options: { filters },
  database,
});
