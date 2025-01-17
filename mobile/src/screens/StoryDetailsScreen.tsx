import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Text, Card, Title, Paragraph, IconButton, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useFavorites } from '../context/FavoritesContext';
import { storyService, Story } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'StoryDetails'>;

const StoryDetailsScreen: React.FC<Props> = ({ route }) => {
  const { storyId } = route.params;
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    loadStory();
  }, [storyId]);

  const loadStory = async () => {
    try {
      const data = await storyService.getStoryById(storyId);
      setStory(data);
      setError(null);
    } catch (err) {
      setError('Masal yüklenirken bir hata oluştu');
      console.error('Error loading story:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async () => {
    if (!story) return;

    if (isFavorite(storyId)) {
      await removeFavorite(storyId);
    } else {
      await addFavorite({
        id: story._id,
        title: story.title,
        preview: story.preview
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error || !story) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error || 'Masal bulunamadı'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.storyCard}>
        <Card.Content>
          <View style={styles.header}>
            <Title style={[styles.title, { color: theme.colors.primary }]}>
              {story.title}
            </Title>
            <IconButton
              icon={isFavorite(storyId) ? "heart" : "heart-outline"}
              size={24}
              onPress={toggleFavorite}
              iconColor={theme.colors.primary}
            />
          </View>
          
          <View style={styles.metaInfo}>
            <Text style={styles.author}>{story.author}</Text>
            <Text style={styles.readingTime}>{story.readingTime}</Text>
          </View>

          <Paragraph style={styles.content}>
            {story.content}
          </Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  storyCard: {
    margin: 16,
    elevation: 4,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    flex: 1,
  },
  metaInfo: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  author: {
    marginRight: 16,
    opacity: 0.7,
  },
  readingTime: {
    opacity: 0.7,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default StoryDetailsScreen; 