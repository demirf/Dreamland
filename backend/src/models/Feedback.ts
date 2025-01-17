import mongoose, { Document, Schema } from 'mongoose';

export interface IFeedback extends Document {
  message: string;
  createdAt: Date;
}

const FeedbackSchema = new Schema({
  message: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
}); 