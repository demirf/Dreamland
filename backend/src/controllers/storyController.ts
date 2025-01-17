import { Request, Response } from 'express';
import Story from '../models/Story';

// Tüm masalları getir
export const getAllStories = async (req: Request, res: Response) => {
  try {
    const stories = await Story.find().select('title preview author readingTime');
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: 'Masallar getirilirken bir hata oluştu' });
  }
};

// Tek bir masalı getir
export const getStoryById = async (req: Request, res: Response) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Masal bulunamadı' });
    }
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: 'Masal getirilirken bir hata oluştu' });
  }
};

// Yeni masal ekle
export const createStory = async (req: Request, res: Response) => {
  try {
    const story = new Story(req.body);
    await story.save();
    res.status(201).json(story);
  } catch (error) {
    res.status(400).json({ message: 'Masal eklenirken bir hata oluştu' });
  }
}; 