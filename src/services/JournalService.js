import database, { Journals as Model } from '../models';
import { journalForm as form } from '../definitions';
import { journalFilters as filters } from '../definitionsFilters';
import createResourceService, { serviceDefaultProps } from '../utils/createResourceService';

export const fields = [
  'id',
  'UserId',
  'type',
  'createdAt',
  'updatedAt',
];

export default createResourceService(Model, serviceDefaultProps({
  form,
  filters,
  fields,
  database,
}));
