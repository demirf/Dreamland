import mongoose, { Document, Schema } from 'mongoose';

export interface IStory extends Document {
  title: string;
  content: string;
  readingTime: string;
  preview: string;
  category: mongoose.Types.ObjectId;
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
  readingTime: {
    type: String,
    required: true
  },
  preview: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model<IStory>('Story', StorySchema); 