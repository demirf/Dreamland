import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export interface Story {
  _id: string;
  title: string;
  content: string;
  preview: string;
  readingTime: string;
  category: {
    _id: string;
    name: string;
    icon: string;
  };
}

export interface Category {
  _id: string;
  name: string;
  description: string;
  icon: string;
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

export const categoryService = {
  getAllCategories: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    return response.data;
  },

  getCategoryById: async (id: string): Promise<Category> => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  getStoriesByCategory: async (categoryId: string): Promise<Story[]> => {
    const response = await api.get(`/categories/${categoryId}/stories`);
    return response.data;
  },
};

export const feedbackService = {
  sendFeedback: async (message: string): Promise<{ message: string }> => {
    const response = await api.post('/feedback', { message });
    return response.data;
  },
}; 