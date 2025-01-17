import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Story = {
  id: string;
  title: string;
  preview: string;
};

type FavoritesContextType = {
  favorites: Story[];
  addFavorite: (story: Story) => Promise<void>;
  removeFavorite: (storyId: string) => Promise<void>;
  isFavorite: (storyId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Story[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favoritesJson = await AsyncStorage.getItem('favorites');
      if (favoritesJson) {
        setFavorites(JSON.parse(favoritesJson));
      }
    } catch (error) {
      console.error('Favoriler yüklenirken hata oluştu:', error);
    }
  };

  const saveFavorites = async (newFavorites: Story[]) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Favoriler kaydedilirken hata oluştu:', error);
    }
  };

  const addFavorite = async (story: Story) => {
    const newFavorites = [...favorites, story];
    setFavorites(newFavorites);
    await saveFavorites(newFavorites);
  };

  const removeFavorite = async (storyId: string) => {
    const newFavorites = favorites.filter(story => story.id !== storyId);
    setFavorites(newFavorites);
    await saveFavorites(newFavorites);
  };

  const isFavorite = (storyId: string) => {
    return favorites.some(story => story.id === storyId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}; 