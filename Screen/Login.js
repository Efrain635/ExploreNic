import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image, Alert, Dimensions } from 'react-native';
import { auth } from "../../ExploreNic/database/firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    try {
      // Iniciar sesión con Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('MyTabs');
    } catch (error) {
      Alert.alert('Error', 'No se pudo iniciar sesión. Verifique sus credenciales.');
      console.error('Error en el inicio de sesión:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../IMAGENES/Logo.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="#4A6B3E"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#00000"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.createAccountButton, { marginTop: 20 }]}
        onPress={() => navigation.navigate('OpciondeCrearUsuario')}
      >
        <Text style={styles.buttonText}>Crear Cuenta de Usuario</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: width * 0.05,
    backgroundColor: "#FFFF",
  },
  logo: {
    width: width * 10,
    height: height * 0.3,
    marginBottom: height * 0.03,
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: "bold",
    marginBottom: height * 0.05,
    color: "#0067C6",
  },
  input: {
    width: "85%",
    height: height * 0.07,
    borderColor: "#0067C6",
    borderWidth: 2,
    borderRadius: 25,
    marginBottom: height * 0.02,
    paddingHorizontal: 10,
  },
  button: {
    width: "85%",
    height: height * 0.07,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0067C6",
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
  createAccountButton: {
    width: "85%",
    height: height * 0.07,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0067C6",
    borderRadius: 45,
  },
});
