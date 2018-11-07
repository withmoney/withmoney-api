import {
  createService,
  type,
} from 'fastexpress';
import database, { Journals as Model } from '../models';
import { journalFilters as filters } from '../definitionsFilters';

export const definitions = {
  UserId: type.numberType,
  type: type.stringType,
  repeatAmount: type.numberType,
  repeatType: type.stringType,
};

export default createService(Model, {
  definitions,
  options: { filters },
  database,
});
