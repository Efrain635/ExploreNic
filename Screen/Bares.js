import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TextInput } from 'react-native';
import { Linking } from 'react-native';

// Datos de los bares
const barData1 = {
  nombre: 'The View Managua',
  descripcion: 'Bar con ambiente festivo y cócteles exóticos en el centro de Juigalpa.',
  servicios: ['Wi-Fi', 'Terraza al aire libre', 'Música en vivo'],
  ubicacion: {
    googleMapsUrl: 'https://maps.google.com/?q=12.0900,-85.2100',
  },
  imagenes: [
    require('../IMAGENES/The View 1.jpeg'),
    require('../IMAGENES/The View 2.jpeg'),
    require('../IMAGENES/The View 3.jpeg'),
    require('../IMAGENES/The View 4.jpeg'),
    require('../IMAGENES/The View 5.jpeg'),
    require('../IMAGENES/The View 6.jpeg'),
  ],
};

const barData2 = {
  nombre: 'Amazonia RestoBar',
  descripcion: 'Café y bar con una amplia selección de cervezas y bebidas.',
  servicios: ['Wi-Fi', 'Estacionamiento', 'Terraza'],
  ubicacion: {
    googleMapsUrl: 'https://maps.google.com/?q=12.0890,-85.2090',
  },
  imagenes: [
    require('../IMAGENES/RestoBar 1.jpeg'),
    require('../IMAGENES/RestoBar 2.jpeg'),
    require('../IMAGENES/RestoBar 3.jpeg'),
    require('../IMAGENES/RestoBar 4.jpeg'),
  ],
};

// Nuevo bar: Bar El Oasis
const barData3 = {
  nombre: 'La liga',
  descripcion: 'Bar con un ambiente relajante y buena música.',
  servicios: ['Wi-Fi', 'Área para eventos', 'Comida'],
  ubicacion: {
    googleMapsUrl: 'https://maps.google.com/?q=12.0910,-85.2110',
  },
  imagenes: [
    require('../IMAGENES/La liga 1.jpeg'),
    require('../IMAGENES/La liga 2.jpeg'),
    require('../IMAGENES/La liga 3.jpeg'),
    require('../IMAGENES/La liga 4.jpeg'),
    require('../IMAGENES/La liga 5.jpeg'),
    require('../IMAGENES/La liga 6.jpeg'),
    require('../IMAGENES/La liga 7.jpeg'),
  ],
};

const Bares = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const bares = [barData1, barData2, barData3];

  // Filtrar los bares según la búsqueda
  const filteredBares = bares.filter((bar) =>
    bar.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderServicios = (servicios) => {
    return servicios.map((servicio, index) => (
      <Text key={index} style={styles.servicio}>
        • {servicio}
      </Text>
    ));
  };

  const renderImagenes = (imagenes) => {
    return (
      <FlatList
        data={imagenes}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Image source={item} style={styles.image} />}
      />
    );
  };

  const renderBar = (data) => (
    <View style={styles.barContainer}>
      <Text style={styles.title}>{data.nombre}</Text>
      <Text style={styles.description}>{data.descripcion}</Text>

      <View style={styles.imageContainer}>{renderImagenes(data.imagenes)}</View>

      <Text style={styles.sectionTitle}>Servicios Ofrecidos</Text>
      {renderServicios(data.servicios)}

      <Text style={styles.sectionTitle}>Ubicación</Text>
      <Text
        style={styles.link}
        onPress={() => Linking.openURL(data.ubicacion.googleMapsUrl)}
      >
        Ver en Google Maps
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar bar..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      {filteredBares.length > 0 ? (
        filteredBares.map((bar) => renderBar(bar))
      ) : (
        <Text style={styles.noResults}>No se encontraron bares</Text>
      )}
    </ScrollView>
  );
};

export default Bares;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  barContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0067C6',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 200,
    marginRight: 10,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0067C6',
    marginTop: 20,
    marginBottom: 10,
  },
  servicio: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  link: {
    color: '#0067C6',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  noResults: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
});
