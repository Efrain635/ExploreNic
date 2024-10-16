import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image, Alert, Dimensions } from 'react-native';
import { auth } from "../../ExploreNic/database/firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";

// Obtener dimensiones de la pantalla
const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
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
      navigation.navigate('AgroSense'); // Cambiado de 'Home' a 'AgroSense'
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      Alert.alert('Error', 'No se pudo iniciar sesión. Verifique sus credenciales.');
    }
  };

  return (
    <View style={styles.container}>
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
          placeholderTextColor="#4A6B3E"
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
        </TouchableOpacity>
      </View>

      {/* Botón de Iniciar */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar</Text>
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
    backgroundColor: "#fff",
  },
  title: {
    fontSize: width * 0.08, // Ajuste de tamaño de fuente basado en el ancho de la pantalla
    fontWeight: "bold",
    marginBottom: height * 0.05, // Ajuste de márgenes basado en la altura de la pantalla
    color: "#4A6B3E",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    height: height * 0.07, // Ajuste de altura del campo de texto basado en la altura de la pantalla
    paddingHorizontal: width * 0.03,
    borderWidth: 2,
    borderColor: "#9EAD6E",
    borderRadius: 25,
    marginBottom: height * 0.02,
  },
  inputError: {
    borderColor: "red",
  },
  icon: {
    width: width * 0.06, // Ajuste del tamaño del ícono basado en el ancho de la pantalla
    height: width * 0.06,
    marginRight: width * 0.03,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: width * 0.04, // Ajuste de tamaño de fuente basado en el ancho de la pantalla
    paddingLeft: 10,
    color: "#4A6B3E",
  },
  button: {
    width: "85%",
    height: height * 0.07, // Ajuste de altura del botón basado en la altura de la pantalla
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4A6B3E",
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.05, // Ajuste de tamaño de fuente basado en el ancho de la pantalla
    fontWeight: "bold",
  },
  eyeIconImage: {
    width: width * 0.06, // Ajuste del tamaño del ícono basado en el ancho de la pantalla
    height: width * 0.06,
  },
});