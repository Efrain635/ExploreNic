import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

// Datos de atracciones turísticas
const atracciones = [
  {
    id: '1',
    nombre: 'Volcán Masaya',
    descripcion: 'Uno de los volcanes más activos en Nicaragua, con impresionantes vistas.',
    imagen: require('../IMAGENES/Atracciones/descarga (1).jpeg'), // Asegúrate de tener esta imagen en tu proyecto
  },
  {
    id: '2',
    nombre: 'Islas del Maíz',
    descripcion: 'Un conjunto de islas paradisiacas con playas hermosas y actividades acuáticas.',
    imagen: require('../IMAGENES/Atracciones/descarga (2).jpeg'),
  },
  {
    id: '3',
    nombre: 'Granada',
    descripcion: 'Ciudad colonial famosa por su arquitectura y cultura histórica.',
    imagen: require('../IMAGENES/Atracciones/descarga.jpeg'),
  },
];

export default function Atracciones() {
  const renderAtraccion = ({ item }) => (
    <View style={styles.atraccionContainer}>
      <Image source={item.imagen} style={styles.imagen} />
      <Text style={styles.nombre}>{item.nombre}</Text>
      <Text style={styles.descripcion}>{item.descripcion}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Atracciones Turísticas</Text>
      <FlatList
        data={atracciones}
        renderItem={renderAtraccion}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0067C6',
    padding: 10,
  },
  headerText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  atraccionContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  imagen: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  nombre: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  descripcion: {
    fontSize: 16,
    color: '#666',
  },
});
