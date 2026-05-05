import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function StackHomeScreen({ navigation, route }) {
  const prefix = route.params?.prefix || 'S';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pilih Tugas</Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate(`${prefix}_Tugas1`)}
      >
        <Text style={styles.buttonText}>Tugas 1 (Flexbox)</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate(`${prefix}_Tugas2`)}
      >
        <Text style={styles.buttonText}>Tugas 2 (Props - Kontak)</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate(`${prefix}_Tugas3`)}
      >
        <Text style={styles.buttonText}>Tugas 3 (State & Props)</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate(`${prefix}_Tugas4`)}
      >
        <Text style={styles.buttonText}>Tugas 4 (Event Handling)</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
