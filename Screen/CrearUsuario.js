import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, Dimensions, Modal, FlatList, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from "../../ExploreNic/database/firebaseconfig"; // Importamos db

const { width, height } = Dimensions.get('window');

export default function CreateUserAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const [userType, setUserType] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const userTypes = ['Turista', 'Administrador de Negocio'];

  const handleCreateAccount = async () => {
    // Validar campos vacíos
    if (!name || !email || !password || !confirmPassword || !phoneNumber || !country || !userType) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    // Validar que la contraseña tenga al menos 6 caracteres
    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      // Crear cuenta en Firebase Auth
      await createUserWithEmailAndPassword(auth, email, password);

      // Guardar datos del usuario en Firestore
      await addDoc(collection(db, 'Usuarios'), { // Usamos db aquí
        name,
        email,
        phoneNumber,
        country,
        userType,
        password,
      });

      Alert.alert('Éxito', 'Cuenta de usuario creada exitosamente 😁.');

      // Limpiar los campos después del registro exitoso
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setPhoneNumber('');
      setCountry('');
      setUserType('');

    } catch (error) {
      Alert.alert('Error', 'No se pudo crear la cuenta. Intente nuevamente.');
      console.error('Error en la creación de cuenta:', error.message);
    }
  };

  const handleSelectUserType = (type) => {
    setUserType(type);
    setModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Crear Cuenta de Usuario</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Número de Celular"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="País"
          value={country}
          onChangeText={setCountry}
        />

        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalVisible(true)}
        >
          <Text style={[styles.inputText, { color: userType ? '#000' : '#888' }]}>
            {userType || 'Seleccione Tipo de Usuario'}
          </Text>
        </TouchableOpacity>

        {/* Modal para seleccionar tipo de usuario */}
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Seleccione Tipo de Usuario</Text>
              <FlatList
                data={userTypes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => handleSelectUserType(item)}
                  >
                    <Text style={styles.optionText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
          <Text style={styles.buttonText}>Crear Cuenta</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  inputText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    width: '100%',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#0067C6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
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
    fontSize: 18,
    fontWeight: 'bold',
  },
});
