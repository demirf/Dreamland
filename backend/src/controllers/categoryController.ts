import { Request, Response } from 'express';
import Category from '../models/Category';
import Story from '../models/Story';

// Tüm kategorileri getir
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ message: 'Kategoriler getirilirken bir hata oluştu' });
  }
};

// Tek bir kategoriyi getir
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Kategori bulunamadı' });
    }
    res.json(category);
  } catch (error: any) {
    res.status(500).json({ message: 'Kategori getirilirken bir hata oluştu' });
  }
};

// Yeni kategori ekle
export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Bu isimde bir kategori zaten var' });
    } else {
      res.status(400).json({ message: 'Kategori eklenirken bir hata oluştu' });
    }
  }
};

// Kategoriye ait masalları getir
export const getStoriesByCategory = async (req: Request, res: Response) => {
  try {
    const stories = await Story.find({ category: req.params.id })
      .select('title preview readingTime category')
      .populate('category', 'name icon');
    res.json(stories);
  } catch (error: any) {
    res.status(500).json({ message: 'Masallar getirilirken bir hata oluştu' });
  }
}; 