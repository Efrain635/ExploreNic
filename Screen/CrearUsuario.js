import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../ExploreNic/database/firebaseconfig";


const { width, height } = Dimensions.get('window');

export default function CreateUserAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');

  const handleCreateAccount = async () => {
    if (!name || !email || !password || !confirmPassword || !phoneNumber || !country) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      // Registrar al usuario en Firebase
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Éxito', 'Cuenta de usuario creada exitosamente.');
      
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear la cuenta. Intente nuevamente.');
      console.error('Error en la creación de cuenta:', error.message);
    }
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta de Usuario</Text>
      
      <TextInput style={styles.input} placeholder="Nombre" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Correo electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirmar Contraseña" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Número de Celular" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Seleccionar País" value={country} onChangeText={setCountry} />

      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Crear Cuenta</Text>
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
