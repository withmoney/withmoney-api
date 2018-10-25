import {
  createService,
  serviceDefaultProps,
} from 'fastexpress';
import database, { Journals as Model } from '../models';
import { journalForm as form } from '../definitions';
import { journalFilters as filters } from '../definitionsFilters';

export const fields = [
  'id',
  'UserId',
  'type',
  'repeatAmount',
  'repeatType',
  'createdAt',
  'updatedAt',
];

export default createService(Model, serviceDefaultProps({
  form,
  filters,
  fields,
  database,
}));
