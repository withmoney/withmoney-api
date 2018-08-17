import JournalService from '../services/JournalService';
import createResourceController from '../utils/createResourceController';

const JournalController = createResourceController(JournalService);

export default JournalController;
