import express from 'express';
import { 
  getAllCategories, 
  getCategoryById, 
  getStoriesByCategory,
  createCategory 
} from '../controllers/categoryController';

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.get('/:id/stories', getStoriesByCategory);
router.post('/', createCategory);

export default router; 