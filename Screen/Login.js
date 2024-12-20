import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image, Alert, Dimensions, Modal, TouchableWithoutFeedback, FlatList } from 'react-native';
import { auth } from "../../ExploreNic/database/firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

// Obtener dimensiones de la pantalla
const { width, height } = Dimensions.get('window');

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    // Validación de campos vacíos
    setEmailError(!email);
    setPasswordError(!password);
  
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }
  
    try {
      // Iniciar sesión con Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      
      // Navegar a Home en las pestañas
      navigation.navigate('MyTabs', { screen: 'Home' });
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      Alert.alert('Error', 'No se pudo iniciar sesión. Verifique sus credenciales.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo agregado */}
      <Image
        source={require('../IMAGENES/Logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Iniciar Sesión</Text>

      {/* Campo Correo */}
      <View style={[styles.inputContainer, emailError && styles.inputError]}>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#4A6B3E"
        />
      </View>

      {/* Campo Contraseña */}
      <View style={[styles.inputContainer, passwordError && styles.inputError]}>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholderTextColor="#00000"
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
        </TouchableOpacity>
      </View>

      {/* Botón de Iniciar */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.createAccountButton, { marginTop: 20 }]} onPress={() => navigation.navigate('OpciondeCrearUsuario')}>
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
    padding: width * 0.05, // Ajuste de padding basado en el ancho de la pantalla
    backgroundColor: "#FFFF",
  },

  logo: {
    width: width * 0.5,  // El logo ocupará el 50% del ancho de la pantalla
    height: height * 0.3,  // El logo ocupará el 20% de la altura de la pantalla
    marginBottom: height * 0.03,  // Espacio debajo del logo
  },

  title: {
    fontSize: width * 0.08, // Ajuste de tamaño de fuente basado en el ancho de la pantalla
    fontWeight: "bold",
    marginBottom: height * 0.05, // Ajuste de márgenes basado en la altura de la pantalla
    color: "#0067C6",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    height: height * 0.07, // Ajuste de altura del campo de texto basado en la altura de la pantalla
    paddingHorizontal: width * 0.03,
    borderWidth: 2,
    borderColor: "#0067C6",
    borderRadius: 25,
    marginBottom: height * 0.02,
  },

  inputError: {
    borderColor: "red",
  },

  input: {
    flex: 1,
    height: "100%",
    fontSize: width * 0.04, // Ajuste de tamaño de fuente basado en el ancho de la pantalla
    paddingLeft: 10,
    color: "#0067C6",
  },

  inputText: {
    textAlign: "center",  // Asegura que el texto dentro del botón esté centrado
    fontSize: width * 0.04, // Ajuste de tamaño de fuente basado en el ancho de la pantalla
    color: "#0067C6",
  },

  button: {
    width: "85%",
    height: height * 0.07, // Ajuste de altura del botón basado en la altura de la pantalla
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0067C6",
    borderRadius: 25,
  },

  buttonText: {
    color: "#fff",
    fontSize: width * 0.05, // Ajuste de tamaño de fuente basado en el ancho de la pantalla
    fontWeight: "bold",
  },

  createAccountButton: {
    width: "85%",
    height: height * 0.07, // Ajuste de altura del botón basado en la altura de la pantalla
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0067C6",
    borderRadius: 45,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContainer: {
    width: width * 0.8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },

  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

  modalItemText: {
    fontSize: 16,
    color: '#0067C6',
  },
});
