import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF6B6B',     // Canlı mercan rengi
    secondary: '#4ECDC4',   // Turkuaz
    accent: '#FFE66D',      // Güneş sarısı
    background: '#FFFFFF',  // Beyaz
    surface: '#F7F7F7',    // Açık gri
    text: '#2C3E50',       // Koyu mavi-gri
    error: '#FF4757',      // Parlak kırmızı
    success: '#7BED9F',    // Yumuşak yeşil
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  roundness: 12,
}; 