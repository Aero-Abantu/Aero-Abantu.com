import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { FAB } from 'react-native-paper';
import * as Location from 'expo-location';
import SOSButton from '../components/SOSButton';
import { startListening, stopListening } from '../services/voice';
import { sendSOSNotifications } from '../services/notifications';
import { startBackgroundTracking } from '../services/backgroundTasks';

const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Start background tracking
      await startBackgroundTracking();

      // Watch location changes
      const watchId = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 10,
        },
        (newLocation) => {
          setLocation(newLocation);
        }
      );

      return () => {
        if (watchId) watchId.remove();
      };
    })();
  }, []);

  useEffect(() => {
    const handleVoiceResult = (results) => {
      const sosFound = results.some(res => res.toLowerCase().includes('sos') || res.toLowerCase().includes('help'));
      if (sosFound) {
        handleSOSTrigger();
      }
    };

    if (isListening) {
      startListening(handleVoiceResult, (err) => {
        console.error(err);
        setIsListening(false);
      });
    } else {
      stopListening();
    }
  }, [isListening]);

  const handleSOSTrigger = async () => {
    Alert.alert(
      "SOS TRIGGERED",
      "Emergency services and contacts are being notified.",
      [{ text: "OK" }]
    );
    if (location) {
      await sendSOSNotifications(location);
    } else {
      console.warn("Location not available for SOS");
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -1.286389,
          longitude: 36.817223,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="My Location"
          />
        )}
      </MapView>

      <SOSButton onTrigger={handleSOSTrigger} />

      <FAB
        style={[styles.fab, { bottom: 220 }]}
        icon={isListening ? "microphone" : "microphone-off"}
        onPress={() => setIsListening(!isListening)}
        label={isListening ? "Listening..." : "Voice SOS"}
      />

      <FAB
        style={styles.fab}
        icon="account-multiple"
        onPress={() => navigation.navigate('Contacts')}
        label="Contacts"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 80,
  },
});

export default HomeScreen;
