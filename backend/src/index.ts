import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';
import storyRoutes from './routes/storyRoutes';
import feedbackRoutes from './routes/feedbackRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/stories', storyRoutes);
app.use('/api/feedback', feedbackRoutes);

// MongoDB bağlantısı
connectDB();

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 