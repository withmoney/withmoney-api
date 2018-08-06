import CategoryService from '../services/CategoryService';
import createResourceController from '../utils/createResourceController';

const CategoryController = createResourceController(CategoryService);

export default CategoryController;
