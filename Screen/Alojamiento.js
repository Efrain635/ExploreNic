import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TextInput } from 'react-native';
import { Rating } from 'react-native-ratings';
import { Linking } from 'react-native';

// Datos de La Posada La Casona de Juigalpa
const alojamientoDataCasona = {
  nombre: 'La Posada La Casona de Juigalpa',
  descripcion: 'Un lugar acogedor en Juigalpa, Chontales, Nicaragua.',
  servicios: ['Wi-Fi', 'Desayuno', 'Estacionamiento', 'Recepción 24 horas'],
  ubicacion: {
    googleMapsUrl: 'https://maps.google.com/?q=12.0854,-85.2072',
  },
  imagenes: [
    require('../IMAGENES/hotel la casona 1.jpg'),
    require('../IMAGENES/hotel la casona 2.jpg'),
    require('../IMAGENES/hotel la casona 3.jpg'),
  ],
};

// Datos de Hotel 2 Aries
const alojamientoDataAries = {
  nombre: 'Hotel 2 Aries',
  descripcion: 'Hotel moderno y económico en Juigalpa.',
  servicios: ['Wi-Fi', 'Piscina', 'Gimnasio', 'Recepción 24 horas'],
  ubicacion: {
    googleMapsUrl: 'https://maps.google.com/?q=12.0865,-85.2083',
  },
  imagenes: [
    require('../IMAGENES/hotel 2 aries 1.jpeg'),
    require('../IMAGENES/hotel 2 aries 2.jpeg'),
    require('../IMAGENES/hotel 2 aries 3.jpeg'),
    require('../IMAGENES/hotel 2 aries 4.jpeg'),
  ],
};

// Datos de El Mirador
const alojamientoDataMirador = {
  nombre: 'El Mirador',
  descripcion: 'Hotel con una vista espectacular a las montañas y paisajes naturales.',
  servicios: ['Wi-Fi', 'Restaurante', 'Piscina', 'Aire acondicionado'],
  ubicacion: {
    googleMapsUrl: 'https://maps.google.com/?q=12.0900,-85.2100',
  },
  imagenes: [
    require('../IMAGENES/El mirador 1.jpeg'),
    require('../IMAGENES/El mirador 2.jpeg'),
    require('../IMAGENES/El mirador 3.jpeg'),
    require('../IMAGENES/El mirador 4.jpeg'),
  ],
};

const Alojamiento = () => {
  const [ratingCasona, setRatingCasona] = useState(4);
  const [ratingAries, setRatingAries] = useState(4);
  const [ratingMirador, setRatingMirador] = useState(5); // Inicializamos la valoración para El Mirador
  const [searchQuery, setSearchQuery] = useState('');

  const alojamientos = [alojamientoDataCasona, alojamientoDataAries, alojamientoDataMirador];

  // Filtrar los alojamientos según la búsqueda
  const filteredAlojamientos = alojamientos.filter((alojamiento) =>
    alojamiento.nombre.toLowerCase().includes(searchQuery.toLowerCase())
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

  const renderAlojamiento = (data, rating, setRating) => (
    <View style={styles.alojamientoContainer}>
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

      <Text style={styles.sectionTitle}>Valoración</Text>
      <Rating
        startingValue={rating}
        imageSize={30}
        onFinishRating={(value) => setRating(value)}
        style={styles.rating}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar alojamiento..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      {filteredAlojamientos.length > 0 ? (
        filteredAlojamientos.map((alojamiento) =>
          renderAlojamiento(
            alojamiento,
            alojamiento === alojamientoDataCasona
              ? ratingCasona
              : alojamiento === alojamientoDataAries
              ? ratingAries
              : ratingMirador, // Agregamos la valoración para El Mirador
            alojamiento === alojamientoDataCasona
              ? setRatingCasona
              : alojamiento === alojamientoDataAries
              ? setRatingAries
              : setRatingMirador // Actualizamos la función de valoración para El Mirador
          )
        )
      ) : (
        <Text style={styles.noResults}>No se encontraron alojamientos</Text>
      )}
    </ScrollView>
  );
};

export default Alojamiento;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  alojamientoContainer: {
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
  rating: {
    alignSelf: 'center',
    marginTop: 10,
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
