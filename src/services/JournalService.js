import { Journals } from '../models';
import { journalForm } from '../definitions';
import { journalFilters as filters } from '../definitionsFilters';
import createResourceService from '../utils/createResourceService';

export const fields = [
  'id',
  'UserId',
  'type',
  'createdAt',
  'updatedAt',
];

const service = createResourceService(Journals, {
  definitions: journalForm,
  options: { fields, filters },
});

export default service;
