import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TextInput } from 'react-native';
import { Linking } from 'react-native';

// Datos de los restaurantes
const restauranteData1 = {
  nombre: 'El Cheff En su Hogar',
  descripcion: 'Comida tradicional nicaragüense en el centro de Juigalpa.',
  servicios: ['Wi-Fi', 'Comida para llevar', 'Mesas al aire libre'],
  ubicacion: {
    googleMapsUrl: 'https://maps.google.com/?q=12.0854,-85.2072',
  },
  imagenes: [
    require('../IMAGENES/Cheff En su Hogar 1.jpeg'),
    require('../IMAGENES/Cheff En su Hogar 2.jpeg'),
    require('../IMAGENES/Cheff En su Hogar 3.jpeg'),
    require('../IMAGENES/Cheff En su Hogar 4.jpeg'),
  ],
};

const restauranteData2 = {
  nombre: 'Asados Bernie´s',
  descripcion: 'Especialidad en asados y deliciosos platos típicos.',
  servicios: ['Wi-Fi', 'Estacionamiento', 'Bar'],
  ubicacion: {
    googleMapsUrl: 'https://maps.google.com/?q=12.0865,-85.2083',
  },
  imagenes: [
    require('../IMAGENES/Asados Bernie 1.jpeg'),
    require('../IMAGENES/Asados Bernie 2.jpeg'),
    require('../IMAGENES/Asados Bernie 3.jpeg'),
    require('../IMAGENES/Asados Bernie 4.jpeg'),
  ],
};

// Nuevo restaurante: Restaurante La Casona
const restauranteData3 = {
  nombre: 'Restaurante Los caracoles Negros',
  descripcion: 'Restaurante familiar con ambiente acogedor y platillos variados.',
  servicios: ['Wi-Fi', 'Área para eventos', 'Estacionamiento privado'],
  ubicacion: {
    googleMapsUrl: 'https://maps.google.com/?q=12.0897,-85.2101',
  },
  imagenes: [
    require('../IMAGENES/Los caracoles Negros 1.jpeg'),
    require('../IMAGENES/Los caracoles Negros 2.jpeg'),
    require('../IMAGENES/Los caracoles Negros 3.jpeg'),
    require('../IMAGENES/Los caracoles Negros 4.jpeg'),
  ],
};

const Restaurantes = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const restaurantes = [restauranteData1, restauranteData2, restauranteData3];

  // Filtrar los restaurantes según la búsqueda
  const filteredRestaurantes = restaurantes.filter((restaurante) =>
    restaurante.nombre.toLowerCase().includes(searchQuery.toLowerCase())
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

  const renderRestaurante = (data) => (
    <View style={styles.restauranteContainer}>
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
        placeholder="Buscar restaurante..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      {filteredRestaurantes.length > 0 ? (
        filteredRestaurantes.map((restaurante) => renderRestaurante(restaurante))
      ) : (
        <Text style={styles.noResults}>No se encontraron restaurantes</Text>
      )}
    </ScrollView>
  );
};

export default Restaurantes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  restauranteContainer: {
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
