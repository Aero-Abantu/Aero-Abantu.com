# AeroAbantu - AI Emergency Response Alert App

AeroAbantu is a cross-platform mobile application built with React Native and Expo, designed to provide instant emergency assistance through AI-driven voice commands and manual SOS triggers.

## Features

- **Authentication**: Secure Sign Up and Login using Firebase.
- **Interactive Map**: Real-time geolocation tracking with an interactive MapView.
- **SOS Voice Command**: Hands-free emergency triggering using voice recognition (detects "SOS" or "Help").
- **SOS Button**: Quick-access physical button (long press) to trigger alerts.
- **Emergency Contacts**: Manage a list of contacts to be notified during an emergency.
- **Automated Alerts**: Sends simulated SMS and Email notifications with Google Maps location links.
- **Background Support**: Continued monitoring and location tracking even when the app is in the background.

## Prerequisites

- Node.js (v18 or later)
- Expo CLI
- Firebase account for authentication

## Installation

1. Clone the repository.
2. Navigate to the project directory:
   ```bash
   cd AeroAbantu
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Setup Firebase:
   - Update `src/services/firebase.js` with your own Firebase configuration.

## Running Locally

- Start the Expo development server:
  ```bash
  npx expo start
  ```
- Use the Expo Go app on your phone to scan the QR code.

## Building for Production (Play Store & App Store)

To generate `.apk` (Android) and `.ipa` (iOS) files, we recommend using **Expo Application Services (EAS)**.

### 1. Install EAS CLI
```bash
npm install -g eas-cli
```

### 2. Login to Expo
```bash
eas login
```

### 3. Configure the Build
```bash
eas build:configure
```

### 4. Build for Android (APK)
To generate an installable APK for testing:
```bash
eas build -p android --profile preview
```
This will provide a download link to the `.apk` file once the cloud build is complete.

### 5. Build for iOS (IPA)
To build for iOS (requires an Apple Developer Program membership):
```bash
eas build -p ios
```

## Testing

Run the test suite using:
```bash
npm test
```

## License
MIT
