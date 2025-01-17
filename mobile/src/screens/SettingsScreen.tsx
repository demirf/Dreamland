import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Portal, Dialog, TextInput, Button, useTheme, Snackbar } from 'react-native-paper';
import { feedbackService } from '../services/api';

const SettingsScreen = () => {
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const theme = useTheme();

  const handleSubmitFeedback = async () => {
    if (!feedback.trim()) return;

    setLoading(true);
    try {
      const response = await feedbackService.sendFeedback(feedback);
      setSnackbarMessage(response.message);
      setSnackbarVisible(true);
      setFeedback('');
      setFeedbackVisible(false);
    } catch (error) {
      setSnackbarMessage('Geri bildirim gönderilirken bir hata oluştu');
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
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
              disabled={loading}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button 
              onPress={() => setFeedbackVisible(false)}
              textColor="#666666"
              disabled={loading}
            >
              İptal
            </Button>
            <Button 
              mode="contained" 
              onPress={handleSubmitFeedback}
              disabled={!feedback.trim() || loading}
              style={styles.submitButton}
              loading={loading}
            >
              Gönder
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={styles.snackbar}
      >
        {snackbarMessage}
      </Snackbar>
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
  snackbar: {
    marginBottom: 20,
  },
});

export default SettingsScreen; 