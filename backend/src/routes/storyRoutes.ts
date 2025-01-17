import express from 'express';
import { getAllStories, getStoryById, createStory } from '../controllers/storyController';

const router = express.Router();

router.get('/', getAllStories);
router.get('/:id', getStoryById);
router.post('/', createStory);

export default router; 