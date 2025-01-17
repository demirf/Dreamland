import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/theme/theme';
import MainTabs from './src/navigation/MainTabs';
import StoryDetailsScreen from './src/screens/StoryDetailsScreen';
import CategoryDetailsScreen from './src/screens/CategoryDetailsScreen';
import { RootStackParamList } from './src/navigation/types';
import { FavoritesProvider } from './src/context/FavoritesContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <FavoritesProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="MainTabs"
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen
              name="MainTabs"
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="StoryDetails"
              component={StoryDetailsScreen}
              options={{ title: 'Masal Detayı' }}
            />
            <Stack.Screen
              name="CategoryDetails"
              component={CategoryDetailsScreen}
              options={{ title: 'Kategori Detayı' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </PaperProvider>
  );
}
