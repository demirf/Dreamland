import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Text, Card, Title, Paragraph, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { storyService, Story } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      const data = await storyService.getAllStories();
      setStories(data);
      setError(null);
    } catch (err) {
      setError('Masallar yüklenirken bir hata oluştu');
      console.error('Error loading stories:', err);
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

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.welcome, { color: theme.colors.primary }]}>
        Hoş Geldin!
      </Text>
      
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
                <Text style={styles.author}>{story.author}</Text>
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
  welcome: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
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
    opacity: 0.7,
  },
  author: {
    marginRight: 16,
  },
  readingTime: {
    fontStyle: 'italic',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default HomeScreen; 