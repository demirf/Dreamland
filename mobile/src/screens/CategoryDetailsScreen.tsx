import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Text, Card, Title, Paragraph, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { categoryService, Story, Category } from '../services/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'CategoryDetails'>;

const CategoryDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    loadCategoryAndStories();
  }, []);

  const loadCategoryAndStories = async () => {
    try {
      const [categoryData, storiesData] = await Promise.all([
        categoryService.getCategoryById(route.params.categoryId),
        categoryService.getStoriesByCategory(route.params.categoryId)
      ]);
      setCategory(categoryData);
      setStories(storiesData);
      setError(null);
    } catch (err) {
      setError('Veriler yüklenirken bir hata oluştu');
      console.error('Error loading category and stories:', err);
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
        <View style={styles.categoryInfo}>
          <Icon 
            name={category.icon} 
            size={32} 
            color={theme.colors.primary}
            style={styles.categoryIcon}
          />
          <Text style={[styles.categoryName, { color: theme.colors.primary }]}>
            {category.name}
          </Text>
        </View>
        <Text style={styles.description}>{category.description}</Text>
      </View>

      <View style={styles.storiesContainer}>
        {stories.map((story) => (
          <Card
            key={story._id}
            style={styles.storyCard}
            onPress={() => navigation.navigate('StoryDetails', { storyId: story._id })}
          >
            <Card.Content>
              <Title>{story.title}</Title>
              <Paragraph>{story.preview}</Paragraph>
              <View style={styles.metaInfo}>
                <View style={styles.categoryInfo}>
                  <Icon 
                    name={story.category.icon} 
                    size={16} 
                    color={theme.colors.primary}
                    style={styles.storyIcon}
                  />
                  <Text style={styles.storyCategoryName}>{story.category.name}</Text>
                </View>
                <Text style={styles.readingTime}>{story.readingTime}</Text>
              </View>
            </Card.Content>
          </Card>
        ))}
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIcon: {
    marginRight: 8,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    opacity: 0.7,
  },
  storiesContainer: {
    padding: 16,
  },
  storyCard: {
    marginBottom: 16,
    elevation: 4,
    borderRadius: 12,
  },
  metaInfo: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storyIcon: {
    marginRight: 4,
  },
  storyCategoryName: {
    fontSize: 12,
    opacity: 0.7,
  },
  readingTime: {
    fontSize: 12,
    fontStyle: 'italic',
    opacity: 0.7,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default CategoryDetailsScreen; 