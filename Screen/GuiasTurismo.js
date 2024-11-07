import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TextInput, Linking, ActivityIndicator } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../database/firebaseconfig'; 

const GuiasTurismo = () => {
  const [guias, setGuias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Función para obtener los guías turísticos desde Firebase
  const fetchGuias = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'Guías turísticos'));
      const guiasData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      setGuias(guiasData);
    } catch (error) {
      console.error("Error al obtener guías:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuias();
  }, []);

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
        renderItem={({ item }) => <Image source={{ uri: item }} style={styles.image} />}
      />
    );
  };

  const renderGuia = ({ item }) => (
    <View style={styles.guiaContainer}>
      <Text style={styles.title}>{item.nombre}</Text>
      <Text style={styles.description}>{item.descripcion}</Text>

      <View style={styles.imageContainer}>
        {item.imagenes && Array.isArray(item.imagenes) ? renderImagenes(item.imagenes) : <Text>No hay imágenes disponibles</Text>}
      </View>

      <Text style={styles.sectionTitle}>Servicios Ofrecidos</Text>
      {renderServicios(item.servicios)}

      <Text style={styles.sectionTitle}>Ubicación</Text>
      <Text
        style={styles.link}
        onPress={() => Linking.openURL(item.ubicacion.googleMapsUrl)}
      >
        Ver en Google Maps
      </Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0067C6" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar guía..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      {filteredGuias.length > 0 ? (
        <FlatList
          data={filteredGuias}
          renderItem={renderGuia}
          keyExtractor={(item) => item.id}
        />
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
