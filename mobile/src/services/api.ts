import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export interface Story {
  _id: string;
  title: string;
  content: string;
  author: string;
  readingTime: string;
  preview: string;
  createdAt: string;
  updatedAt: string;
}

export const storyService = {
  getAllStories: async (): Promise<Story[]> => {
    const response = await api.get('/stories');
    return response.data;
  },

  getStoryById: async (id: string): Promise<Story> => {
    const response = await api.get(`/stories/${id}`);
    return response.data;
  },
};

export const feedbackService = {
  sendFeedback: async (message: string): Promise<{ message: string }> => {
    const response = await api.post('/feedback', { message });
    return response.data;
  },
}; 