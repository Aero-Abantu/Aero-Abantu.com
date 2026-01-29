import Voice from '@react-native-voice/voice';

export const startListening = async (onResult, onError) => {
  try {
    Voice.onSpeechResults = (e) => {
      if (e.value) {
        onResult(e.value);
      }
    };
    Voice.onSpeechError = (e) => {
      onError(e.error);
    };
    await Voice.start('en-US');
  } catch (e) {
    console.error('Voice recognition failed to start', e);
  }
};

export const stopListening = async () => {
  try {
    await Voice.stop();
    await Voice.destroy();
  } catch (e) {
    console.error('Voice recognition failed to stop', e);
  }
};
