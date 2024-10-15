import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

const UsersScreen = () => {
  const handleOptionPress = (option) => {
    console.log(`${option} seleccionado`);
    // Aquí puedes implementar la lógica para cada opción
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://example.com/your-profile-image.jpg' }} // Cambia la URL a la imagen del perfil
          style={styles.profileImage} 
        />
        <Text style={styles.userName}>Maria de los Angeles</Text>
      </View>

      <ScrollView style={styles.optionsContainer}>
        <Text style={styles.sectionTitle}>Configuración</Text>
        {['Información personal', 'Inicio de sesión y seguridad', 'Accesibilidad', 'Traducción'].map(option => (
          <TouchableOpacity 
            key={option} 
            style={styles.option} 
            onPress={() => handleOptionPress(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>Asistente</Text>
        {['Visita el Centro de ayuda', 'Cómo funciona ExploreNic', 'Envíanos tus comentarios', 'Agregar Cuenta'].map(option => (
          <TouchableOpacity 
            key={option} 
            style={styles.option} 
            onPress={() => handleOptionPress(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={() => handleOptionPress('Cerrar Sesión')}
        >
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  optionsContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  option: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UsersScreen;
