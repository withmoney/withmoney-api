import { createController } from 'fastexpress';
import CategoryService from '../services/CategoryService';

const CategoryController = createController(CategoryService);

export default CategoryController;
