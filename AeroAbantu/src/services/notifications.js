import * as SMS from 'expo-sms';
import * as MailComposer from 'expo-mail-composer';
import { getContacts } from './contacts';

export const sendSOSNotifications = async (location) => {
  const contacts = await getContacts();
  if (contacts.length === 0) {
    console.warn('No emergency contacts found');
    return false;
  }

  const locationLink = `https://www.google.com/maps/search/?api=1&query=${location.coords.latitude},${location.coords.longitude}`;
  const message = `EMERGENCY SOS! I need help. My location: ${locationLink}`;

  // 1. Try sending SMS to all contacts (this opens the native SMS app)
  const phoneNumbers = contacts.map(c => c.phone);
  const isAvailable = await SMS.isAvailableAsync();
  if (isAvailable) {
    await SMS.sendSMSAsync(phoneNumbers, message);
  } else {
    console.warn('SMS is not available on this device');
  }

  // 2. Try sending Email (this opens the native mail app)
  const emails = contacts.map(c => c.email);
  const isMailAvailable = await MailComposer.isAvailableAsync();
  if (isMailAvailable) {
    await MailComposer.composeAsync({
      recipients: emails,
      subject: 'EMERGENCY SOS - AeroAbantu',
      body: message,
    });
  } else {
    console.warn('Mail is not available on this device');
  }

  return true;
};
