import { createController } from 'fastexpress';
import JournalService from '../services/JournalService';

const JournalController = createController(JournalService);

export default JournalController;
