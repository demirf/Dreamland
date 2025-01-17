import mongoose, { Document, Schema } from 'mongoose';

export interface IStory extends Document {
  title: string;
  content: string;
  author: string;
  readingTime: string;
  preview: string;
  createdAt: Date;
  updatedAt: Date;
}

const StorySchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  readingTime: {
    type: String,
    required: true
  },
  preview: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.model<IStory>('Story', StorySchema); 