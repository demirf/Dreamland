import { Request, Response } from 'express';
import mongoose from 'mongoose';

const Feedback = mongoose.model('Feedback', new mongoose.Schema({
  message: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
}));

export const createFeedback = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ message: 'Geri bildirim mesajı gereklidir' });
    }

    const feedback = new Feedback({ message });
    await feedback.save();

    res.status(201).json({ 
      message: 'Geri bildiriminiz için teşekkür ederiz!',
      feedback 
    });
  } catch (error) {
    console.error('Feedback error:', error);
    res.status(500).json({ message: 'Geri bildirim gönderilirken bir hata oluştu' });
  }
}; 