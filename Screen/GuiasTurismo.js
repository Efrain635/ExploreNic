import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TextInput } from 'react-native';
import { Linking } from 'react-native';

// Datos de los guías turísticos
const guiaData1 = {
  nombre: 'Carlos Martínez',
  descripcion: 'Guía especializado en ecoturismo y recorridos por reservas naturales en Nicaragua.',
  servicios: ['Tours guiados', 'Excursiones a pie', 'Recorridos personalizados'],
  ubicacion: {
    googleMapsUrl: 'https://maps.google.com/?q=12.1234,-85.2020',
  },
  imagenes: [
    require('../IMAGENES/GuiasTurismo 1.jpg'),
    require('../IMAGENES/GuiasTurismo 2.jpg'),
    require('../IMAGENES/GuiasTurismo 3.jpg'),
    require('../IMAGENES/GuiasTurismo 4.jpg'),
  ],
};

const guiaData2 = {
  nombre: 'Ana López',
  descripcion: 'Guía bilingüe con experiencia en recorridos históricos y culturales en Granada y León.',
  servicios: ['Tours en inglés y español', 'Visitas culturales', 'Recorridos en grupo'],
  ubicacion: {
    googleMapsUrl: 'https://maps.google.com/?q=12.1256,-85.2067',
  },
  imagenes: [
    require('../IMAGENES/Guias 1.png'),
    require('../IMAGENES/Guias 2.png'),
    require('../IMAGENES/Guias 3.jpg'),
    require('../IMAGENES/Guias 4.jpg'),
  ],
};

const guiaData3 = {
  nombre: 'Juan Pérez',
  descripcion: 'Guía local experto en turismo de aventura y actividades al aire libre.',
  servicios: ['Rutas de senderismo', 'Escalada', 'Actividades al aire libre'],
  ubicacion: {
    googleMapsUrl: 'https://maps.google.com/?q=12.1289,-85.2098',
  },
  imagenes: [
    require('../IMAGENES/Turismo 1.jpg'),
    require('../IMAGENES/Turismo 2.jpg'),
    require('../IMAGENES/Turismo 3.jpg'),
    require('../IMAGENES/Turismo 4.jpg'),
  ],
};

const GuiasTurismo = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const guias = [guiaData1, guiaData2, guiaData3];

  // Filtrar los guías turísticos según la búsqueda
  const filteredGuias = guias.filter((guia) =>
    guia.nombre.toLowerCase().includes(searchQuery.toLowerCase())
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

  const renderGuia = (data) => (
    <View style={styles.guiaContainer}>
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
        placeholder="Buscar guía..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      {filteredGuias.length > 0 ? (
        filteredGuias.map((guia) => renderGuia(guia))
      ) : (
        <Text style={styles.noResults}>No se encontraron guías turísticos</Text>
      )}
    </ScrollView>
  );
};

export default GuiasTurismo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  guiaContainer: {
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
