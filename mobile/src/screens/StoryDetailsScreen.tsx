import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Card, Title, Paragraph, IconButton, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useFavorites } from '../context/FavoritesContext';

type Props = NativeStackScreenProps<RootStackParamList, 'StoryDetails'>;

const StoryDetailsScreen: React.FC<Props> = ({ route }) => {
  const { storyId } = route.params;
  const theme = useTheme();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  // Bu kısım daha sonra API'den gelecek
  const storyDetails = {
    id: storyId,
    title: 'Uyuyan Güzel',
    content: `Bir varmış bir yokmuş, çok uzak bir krallıkta güzel mi güzel bir prenses yaşarmış. 
    
Bu prensesin doğumunda bütün krallık çok mutlu olmuş ve büyük bir kutlama düzenlenmiş. Kutlamaya ülkenin bütün önemli kişileri ve periler davetliymiş.

Ancak yaşlı ve kötü kalpli bir peri bu davete çağrılmadığı için çok sinirlenmiş. Kutlamanın ortasında aniden belirivermiş ve "Prenses 16 yaşına geldiğinde bir iğneye batacak ve sonsuza dek uykuya dalacak!" diye bir büyü yapmış.

Neyse ki iyi kalpli perilerden biri bu laneti tamamen kaldıramasa da değiştirebilmiş: "Prenses gerçek aşkın öpücüğüyle uyanabilecek."

Ve böylece masal başlamış...`,
    author: 'Grimm Kardeşler',
    readingTime: '5 dakika',
    preview: 'Bir varmış bir yokmuş...'
  };

  const toggleFavorite = async () => {
    if (isFavorite(storyId)) {
      await removeFavorite(storyId);
    } else {
      await addFavorite({
        id: storyDetails.id,
        title: storyDetails.title,
        preview: storyDetails.preview
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.storyCard}>
        <Card.Content>
          <View style={styles.header}>
            <Title style={[styles.title, { color: theme.colors.primary }]}>
              {storyDetails.title}
            </Title>
            <IconButton
              icon={isFavorite(storyId) ? "heart" : "heart-outline"}
              size={24}
              onPress={toggleFavorite}
              iconColor={theme.colors.primary}
            />
          </View>
          
          <View style={styles.metaInfo}>
            <Text style={styles.author}>{storyDetails.author}</Text>
            <Text style={styles.readingTime}>{storyDetails.readingTime}</Text>
          </View>

          <Paragraph style={styles.content}>
            {storyDetails.content}
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
});

export default StoryDetailsScreen; 