import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Title, Paragraph, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'StoryDetails'>;

const FavoritesScreen = () => {
  const [favorites, setFavorites] = React.useState<any[]>([]);
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();

  React.useEffect(() => {
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

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Henüz favori masal eklemediniz</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.storiesContainer}>
        {favorites.map((story) => (
          <Card
            key={story.id}
            style={styles.storyCard}
            onPress={() => navigation.navigate('StoryDetails', { storyId: story.id })}
          >
            <Card.Content>
              <Title>{story.title}</Title>
              <Paragraph>{story.preview}</Paragraph>
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  emptyText: {
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
});

export default FavoritesScreen; 