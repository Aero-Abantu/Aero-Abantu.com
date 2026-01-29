import AsyncStorage from '@react-native-async-storage/async-storage';

const CONTACTS_KEY = '@aeroabantu_contacts';

export const getContacts = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(CONTACTS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to fetch contacts', e);
    return [];
  }
};

export const addContact = async (contact) => {
  try {
    const existingContacts = await getContacts();
    const newContacts = [...existingContacts, { ...contact, id: Date.now().toString() }];
    const jsonValue = JSON.stringify(newContacts);
    await AsyncStorage.setItem(CONTACTS_KEY, jsonValue);
    return newContacts;
  } catch (e) {
    console.error('Failed to add contact', e);
    throw e;
  }
};

export const deleteContact = async (id) => {
  try {
    const existingContacts = await getContacts();
    const newContacts = existingContacts.filter(c => c.id !== id);
    const jsonValue = JSON.stringify(newContacts);
    await AsyncStorage.setItem(CONTACTS_KEY, jsonValue);
    return newContacts;
  } catch (e) {
    console.error('Failed to delete contact', e);
    throw e;
  }
};
