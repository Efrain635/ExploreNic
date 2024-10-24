import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TextInput } from 'react-native';
import { Rating } from 'react-native-ratings';
import { Linking } from 'react-native';

// Datos de Alquiler Auto 1
const alquilerData1 = {
  nombre: 'Auto Compacto Económico',
  descripcion: 'Un auto compacto ideal para viajes cortos en la ciudad.',
  servicios: ['Aire acondicionado', 'Kilometraje ilimitado', 'GPS incluido', 'Seguro básico'],
  ubicacion: {
    googleMapsUrl: 'https://maps.google.com/?q=12.0854,-85.2072',
  },
  imagenes: [
    require('../IMAGENES/22.jpeg'),
    require('../IMAGENES/23.jpeg'),
    require('../IMAGENES/24.jpeg'),
  ],
};

// Datos de Alquiler Auto 2
const alquilerData2 = {
  nombre: 'SUV Familiar',
  descripcion: 'Vehículo ideal para familias y viajes largos.',
  servicios: ['Wi-Fi', 'Seguro completo', 'Aire acondicionado', 'GPS avanzado'],
  ubicacion: {
    googleMapsUrl: 'https://maps.google.com/?q=12.0865,-85.2083',
  },
  imagenes: [
    require('../IMAGENES/AlquilerCoche1.jpeg'),
    require('../IMAGENES/AlquilerCoche2.jpeg'),
    require('../IMAGENES/AlquilerCoche4.jpeg'),
  ],
};

// Datos de Alquiler Auto 3
const alquilerData3 = {
  nombre: 'Auto Deportivo',
  descripcion: 'Un auto deportivo para los amantes de la velocidad.',
  servicios: ['Asientos de cuero', 'Aire acondicionado', 'Seguro completo', 'Kilometraje ilimitado'],
  ubicacion: {
    googleMapsUrl: 'https://maps.google.com/?q=12.0900,-85.2100',
  },
  imagenes: [
    require('../IMAGENES/AlquilerdeCoches3.jpg'),
    require('../IMAGENES/Lugardearquilerdeautos.jpeg'),
  ],
};

const AlquilerAutos = () => {
  const [ratingAuto1, setRatingAuto1] = useState(4);
  const [ratingAuto2, setRatingAuto2] = useState(5);
  const [ratingAuto3, setRatingAuto3] = useState(4);
  const [searchQuery, setSearchQuery] = useState('');

  const alquileres = [alquilerData1, alquilerData2, alquilerData3];

  // Filtrar los autos según la búsqueda
  const filteredAlquileres = alquileres.filter((alquiler) =>
    alquiler.nombre.toLowerCase().includes(searchQuery.toLowerCase())
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

  const renderAlquiler = (data, rating, setRating) => (
    <View style={styles.alquilerContainer}>
      <Text style={styles.title}>{data.nombre}</Text>
      <Text style={styles.description}>{data.descripcion}</Text>

      <View style={styles.imageContainer}>{renderImagenes(data.imagenes)}</View>

      <Text style={styles.sectionTitle}>Características del Auto</Text>
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
        placeholder="Buscar auto en alquiler..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      {filteredAlquileres.length > 0 ? (
        filteredAlquileres.map((alquiler) =>
          renderAlquiler(
            alquiler,
            alquiler === alquilerData1
              ? ratingAuto1
              : alquiler === alquilerData2
              ? ratingAuto2
              : ratingAuto3,
            alquiler === alquilerData1
              ? setRatingAuto1
              : alquiler === alquilerData2
              ? setRatingAuto2
              : setRatingAuto3
          )
        )
      ) : (
        <Text style={styles.noResults}>No se encontraron autos en alquiler</Text>
      )}
    </ScrollView>
  );
};

export default AlquilerAutos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  alquilerContainer: {
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
