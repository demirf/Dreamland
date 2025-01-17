import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Portal, Dialog, TextInput, Button, useTheme } from 'react-native-paper';

const SettingsScreen = () => {
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedback, setFeedback] = useState('');
  const theme = useTheme();

  const handleSubmitFeedback = async () => {
    // Burada feedback'i backend'e gönderebiliriz
    console.log('Geri bildirim:', feedback);
    setFeedback('');
    setFeedbackVisible(false);
    // TODO: Başarılı gönderim mesajı göster
  };

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Item
          title="Geri Bildirim"
          description="Düşüncelerinizi bizimle paylaşın"
          left={props => <List.Icon {...props} icon="message-text-outline" />}
          onPress={() => setFeedbackVisible(true)}
        />
      </List.Section>

      <Portal>
        <Dialog 
          visible={feedbackVisible} 
          onDismiss={() => setFeedbackVisible(false)}
          style={styles.dialog}
        >
          <Dialog.Title>Geri Bildirim</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Düşünceleriniz"
              value={feedback}
              onChangeText={setFeedback}
              multiline
              numberOfLines={4}
              mode="outlined"
              style={styles.input}
              outlineStyle={styles.inputOutline}
              theme={{
                colors: {
                  primary: theme.colors.secondary,
                  onSurfaceVariant: '#666666',
                }
              }}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button 
              onPress={() => setFeedbackVisible(false)}
              textColor="#666666"
            >
              İptal
            </Button>
            <Button 
              mode="contained" 
              onPress={handleSubmitFeedback}
              disabled={!feedback.trim()}
              style={styles.submitButton}
            >
              Gönder
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dialog: {
    borderRadius: 8,
  },
  input: {
    marginTop: 8,
    backgroundColor: '#fff',
  },
  inputOutline: {
    borderRadius: 8,
  },
  submitButton: {
    marginLeft: 8,
  },
});

export default SettingsScreen; 