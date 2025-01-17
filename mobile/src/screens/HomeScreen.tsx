import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Title, Paragraph, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();

  const dummyStories = [
    { id: '1', title: 'Kırmızı Başlıklı Kız', preview: 'Bir varmış bir yokmuş...' },
    { id: '2', title: 'Uyuyan Güzel', preview: 'Çok uzak bir krallıkta...' },
    { id: '3', title: 'Bremen Mızıkacıları', preview: 'Dört arkadaş bir gün...' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.welcome, { color: theme.colors.primary }]}>
        Hoş Geldin!
      </Text>
      
      <View style={styles.storiesContainer}>
        {dummyStories.map((story) => (
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
});

export default HomeScreen; 