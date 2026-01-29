import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { TextInput, Button, List, IconButton, Title, Divider } from 'react-native-paper';
import { getContacts, addContact, deleteContact } from '../services/contacts';

const ContactsScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const data = await getContacts();
    setContacts(data);
  };

  const handleAdd = async () => {
    if (!name || !phone || !email) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    try {
      const updated = await addContact({ name, phone, email });
      setContacts(updated);
      setName('');
      setPhone('');
      setEmail('');
    } catch (error) {
      Alert.alert('Error', 'Failed to add contact');
    }
  };

  const handleDelete = async (id) => {
    try {
      const updated = await deleteContact(id);
      setContacts(updated);
    } catch (error) {
      Alert.alert('Error', 'Failed to delete contact');
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Emergency Contacts</Title>
      <View style={styles.form}>
        <TextInput label="Name" value={name} onChangeText={setName} style={styles.input} />
        <TextInput label="Phone" value={phone} onChangeText={setPhone} style={styles.input} keyboardType="phone-pad" />
        <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
        <Button mode="contained" onPress={handleAdd} style={styles.button}>
          Add Contact
        </Button>
      </View>
      <Divider />
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description={`${item.phone} | ${item.email}`}
            right={(props) => (
              <IconButton {...props} icon="delete" onPress={() => handleDelete(item.id)} />
            )}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default ContactsScreen;
