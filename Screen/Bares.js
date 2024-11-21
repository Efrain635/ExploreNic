import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, Linking, ActivityIndicator } from 'react-native';
import { Rating } from 'react-native-ratings';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../database/firebaseconfig';

const Bares = () => {
  const [bares, setBares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Función para obtener bares desde Firebase
  const fetchBares = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'Bares'));
      const baresData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBares(baresData);
    } catch (error) {
      console.error('Error al obtener bares:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBares();
  }, []);

  // Filtrar los bares según la búsqueda
  const filteredBares = bares.filter((bar) =>
    bar.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Función para actualizar la valoración en Firebase
  const handleRating = async (barId, newRating) => {
    try {
      const barRef = doc(db, 'Bares', barId);
      await updateDoc(barRef, {
        valoracion: newRating, // Actualiza la valoración con la nueva calificación
      });
    } catch (error) {
      console.error('Error al actualizar la valoración:', error);
    }
  };

  const renderServicios = (servicios) => {
    return servicios.map((servicio, index) => (
      <Text key={index} style={styles.servicio}>
        • {servicio}
      </Text>
    ));
  };

  const renderImagenes = (imagenes) => (
    <FlatList
      data={imagenes}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <Image
          source={{ uri: item }}
          style={styles.image}
          onError={(e) => console.log('Error al cargar imagen:', e.nativeEvent.error, 'URL:', item)}
        />
      )}
    />
  );

  const renderBar = ({ item }) => (
    <View style={styles.barContainer}>
      <Text style={styles.title}>{item.nombre}</Text>
      <Text style={styles.description}>{item.descripcion}</Text>

      <View style={styles.imageContainer}>
        {item.imagenes && Array.isArray(item.imagenes) ? renderImagenes(item.imagenes) : <Text>No hay imágenes disponibles</Text>}
      </View>

      <Text style={styles.sectionTitle}>Servicios Ofrecidos</Text>
      {renderServicios(item.servicios)}

      <Text style={styles.sectionTitle}>Ubicación</Text>
      <Text style={styles.link} onPress={() => Linking.openURL(item.ubicacion.googleMapsUrl)}>
        Ver en Google Maps
      </Text>

      <Text style={styles.sectionTitle}>Valoración</Text>
      <Rating
        startingValue={item.valoracion || 4}
        imageSize={30}
        onFinishRating={(rating) => handleRating(item.id, rating)} // Actualiza la valoración cuando el usuario califique
        style={styles.rating}
      />
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0067C6" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar bar..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      {filteredBares.length > 0 ? (
        <FlatList
          data={filteredBares}
          renderItem={renderBar}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.noResults}>No se encontraron bares</Text>
      )}
    </View>
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
    backgroundColor: '#003366', // Azul oscuro
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000', // Sombra para darle efecto de profundidad
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Texto blanco para contraste
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#fff', // Texto blanco para contraste
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
    color: '#fff', // Texto blanco para contraste
    marginTop: 20,
    marginBottom: 10,
  },
  servicio: {
    fontSize: 16,
    color: '#fff', // Texto blanco para contraste
    marginBottom: 5,
  },
  link: {
    color: '#00BFFF', // Azul claro para los enlaces
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
