import { Request, Response } from 'express';
import mongoose from 'mongoose';

const Category = mongoose.model('Category', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
}));

// Tüm kategorileri getir
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Kategoriler getirilirken bir hata oluştu' });
  }
};

// Kategori detayını getir
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Kategori bulunamadı' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Kategori getirilirken bir hata oluştu' });
  }
};

// Kategoriye ait masalları getir
export const getStoriesByCategory = async (req: Request, res: Response) => {
  try {
    const stories = await mongoose.model('Story').find({ category: req.params.id })
      .select('title preview author readingTime');
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: 'Masallar getirilirken bir hata oluştu' });
  }
};

// Yeni kategori ekle
export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error: any) {
    if (error.code === 11000) { // MongoDB duplicate key error
      res.status(400).json({ message: 'Bu isimde bir kategori zaten mevcut' });
    } else {
      res.status(400).json({ message: 'Kategori eklenirken bir hata oluştu' });
    }
  }
}; 