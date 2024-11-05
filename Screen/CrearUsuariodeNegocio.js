import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { CrearUsuariodeNegocio } from "firebase/auth";
import { auth } from "../../ExploreNic/database/firebaseconfig";

const { width, height } = Dimensions.get('window');

export default function CreateBusinessAccount({ navigation }) {
  const [businessName, setBusinessName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [businessPassword, setBusinessPassword] = useState('');
  const [confirmBusinessPassword, setConfirmBusinessPassword] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  const handleCreateBusinessAccount = () => {
    if (!businessName || !businessEmail || !businessPassword || !confirmBusinessPassword || !businessPhone || !description || !price || !location || !category) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }
    if (businessPassword !== confirmBusinessPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }
    // Aquí se puede agregar la lógica para crear la cuenta de negocio en Firebase
    Alert.alert('Éxito', 'Cuenta de negocio creada exitosamente.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta de Negocio</Text>

      <TextInput style={styles.input} placeholder="Nombre del Negocio" value={businessName} onChangeText={setBusinessName} />
      <TextInput style={styles.input} placeholder="Correo del Negocio" value={businessEmail} onChangeText={setBusinessEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Contraseña" value={businessPassword} onChangeText={setBusinessPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirmar Contraseña" value={confirmBusinessPassword} onChangeText={setConfirmBusinessPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Número de Atención al Cliente" value={businessPhone} onChangeText={setBusinessPhone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Descripción" value={description} onChangeText={setDescription} />
      <TextInput style={styles.input} placeholder="Precio" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Lugar" value={location} onChangeText={setLocation} />

      {/* Selector de Categoría (puedes personalizar esto como necesites) */}
      <TextInput style={styles.input} placeholder="Seleccionar Categoría (Bar, Hotel, Restaurante)" value={category} onChangeText={setCategory} />

      <TouchableOpacity style={styles.button} onPress={handleCreateBusinessAccount}>
        <Text style={styles.buttonText}>Crear Cuenta de Negocio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.05,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    marginBottom: height * 0.05,
    color: '#0067C6',
  },
  input: {
    width: '85%',
    height: height * 0.07,
    borderColor: '#0067C6',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: height * 0.02,
    paddingHorizontal: 10,
  },
  button: {
    width: '85%',
    height: height * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0067C6',
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFF',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
});
