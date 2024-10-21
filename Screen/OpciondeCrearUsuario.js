import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CrearUsuario from './CrearUsuario';
import CrearUsuariodeNegocio from './CrearUsuariodeNegocio';

export default function OpciondeCrearUsuario() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elige una opción</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Crear Usuario"
          onPress={() => navigation.navigate('CrearUsuario')}
          color="#0067C6"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Crear Usuario de Negocio"
          onPress={() => navigation.navigate('CrearUsuariodeNegocio')}
          color="#0067C6"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6f2ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#0067C6',
  },
  buttonContainer: {
    marginVertical: 15,
    width: '80%',
  },
});
