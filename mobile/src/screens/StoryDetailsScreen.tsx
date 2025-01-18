import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { storyService, Story } from '../services/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'StoryDetails'>;

const StoryDetailsScreen: React.FC<Props> = ({ route }) => {
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    loadStory();
  }, []);

  const loadStory = async () => {
    try {
      const data = await storyService.getStoryById(route.params.storyId);
      setStory(data);
      setError(null);
    } catch (err) {
      setError('Masal yüklenirken bir hata oluştu');
      console.error('Error loading story:', err);
    } finally {
      setLoading(false);
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
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          {story.title}
        </Text>
        <View style={styles.metaInfo}>
          <View style={styles.categoryInfo}>
            <Icon 
              name={story.category.icon} 
              size={20} 
              color={theme.colors.primary}
              style={styles.categoryIcon}
            />
            <Text style={styles.categoryName}>{story.category.name}</Text>
          </View>
          <Text style={styles.readingTime}>{story.readingTime}</Text>
        </View>
      </View>
      <Text style={styles.content}>{story.content}</Text>
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
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    marginRight: 4,
  },
  categoryName: {
    fontSize: 14,
    opacity: 0.7,
  },
  readingTime: {
    fontSize: 14,
    fontStyle: 'italic',
    opacity: 0.7,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    padding: 16,
    textAlign: 'justify'
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default StoryDetailsScreen; 