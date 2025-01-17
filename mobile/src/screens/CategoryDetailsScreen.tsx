import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Text, Card, Title, Paragraph, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { categoryService, Story, Category } from '../services/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'CategoryDetails'>;

const CategoryDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { categoryId } = route.params;
  const [category, setCategory] = useState<Category | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    loadCategoryAndStories();
  }, [categoryId]);

  const loadCategoryAndStories = async () => {
    try {
      const [categoryData, storiesData] = await Promise.all([
        categoryService.getCategoryById(categoryId),
        categoryService.getStoriesByCategory(categoryId)
      ]);
      setCategory(categoryData);
      setStories(storiesData);
      setError(null);
    } catch (err) {
      setError('Kategori bilgileri yüklenirken bir hata oluştu');
      console.error('Error loading category details:', err);
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

  if (error || !category) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error || 'Kategori bulunamadı'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon 
          name={category.icon} 
          size={48} 
          color={theme.colors.primary}
          style={styles.icon}
        />
        <Title style={styles.title}>{category.name}</Title>
        <Text style={styles.description}>{category.description}</Text>
      </View>

      <View style={styles.storiesContainer}>
        <Title style={styles.sectionTitle}>Masallar</Title>
        {stories.length === 0 ? (
          <Text style={styles.emptyText}>Bu kategoride henüz masal bulunmuyor</Text>
        ) : (
          stories.map((story) => (
            <Card
              key={story._id}
              style={styles.storyCard}
              onPress={() => navigation.navigate('StoryDetails', { storyId: story._id })}
            >
              <Card.Content>
                <Title>{story.title}</Title>
                <Paragraph>{story.preview}</Paragraph>
                <View style={styles.metaInfo}>
                  <Text style={styles.author}>{story.author}</Text>
                  <Text style={styles.readingTime}>{story.readingTime}</Text>
                </View>
              </Card.Content>
            </Card>
          ))
        )}
      </View>
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
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
  storiesContainer: {
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  storyCard: {
    marginBottom: 16,
    elevation: 4,
    borderRadius: 12,
  },
  metaInfo: {
    flexDirection: 'row',
    marginTop: 8,
    opacity: 0.7,
  },
  author: {
    marginRight: 16,
  },
  readingTime: {
    fontStyle: 'italic',
  },
  emptyText: {
    textAlign: 'center',
    opacity: 0.7,
    marginTop: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default CategoryDetailsScreen; 