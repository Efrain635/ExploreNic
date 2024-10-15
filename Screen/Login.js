// Screen/Login.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { auth } from '../database/firebaseconfig'; // Asegúrate de que la ruta sea correcta
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Navegar a la pantalla principal después de iniciar sesión
        console.log('Usuario conectado:', userCredential.user);
        navigation.navigate('Menú'); // Cambia a la pantalla que deseas mostrar
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Navegar a la pantalla principal después de registrar
        console.log('Usuario registrado:', userCredential.user);
        navigation.navigate('Menú'); // Cambia a la pantalla que deseas mostrar
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
      <Button title="Crear Usuario" onPress={handleRegister} />
    </View>
  );
};

export default Login;
