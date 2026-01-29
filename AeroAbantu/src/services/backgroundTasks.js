import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

const BACKGROUND_LOCATION_TASK = 'background-location-task';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

TaskManager.defineTask(BACKGROUND_LOCATION_TASK, async ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  if (data) {
    const { locations } = data;
    const location = locations[0];

    // In a real app, you might check if the user has moved out of a safe zone
    // For now, we just notify that background tracking is active
    console.log('Background location update:', location);

    // Optional: Send a local notification to show the app is working
    /*
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "AeroAbantu Tracking",
        body: `Current location: ${location.coords.latitude}, ${location.coords.longitude}`,
      },
      trigger: null,
    });
    */
  }
});

export const startBackgroundTracking = async () => {
  const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
  if (foregroundStatus !== 'granted') return;

  const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
  if (backgroundStatus === 'granted') {
    await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
      accuracy: Location.Accuracy.High,
      distanceInterval: 10,
      deferredUpdatesInterval: 1000,
      foregroundService: {
        notificationTitle: "AeroAbantu is active",
        notificationBody: "Monitoring for your safety in background",
      }
    });
  }
};
