import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const SOSButton = ({ onTrigger }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onLongPress={onTrigger}
      delayLongPress={2000}
    >
      <Text style={styles.text}>SOS</Text>
      <Text style={styles.subtext}>Hold for 2s</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ff0000',
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  subtext: {
    color: '#fff',
    fontSize: 12,
  },
});

export default SOSButton;
