import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, Linking, ActivityIndicator } from 'react-native';
import { Rating } from 'react-native-ratings';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../database/firebaseconfig'; 

const AlquilerAutos = () => {
  const [alquileres, setAlquileres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Función para obtener autos desde Firebase
  const fetchAlquileres = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'Alquiler de coches'));
      const alquileresData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAlquileres(alquileresData);
    } catch (error) {
      console.error("Error al obtener autos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlquileres();
  }, []);

  // Filtrar los autos según la búsqueda
  const filteredAlquileres = alquileres.filter((alquiler) =>
    alquiler.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Función para actualizar la valoración en Firebase
  const handleRating = async (autoId, newRating) => {
    try {
      const autoRef = doc(db, 'AlquilerAutos', autoId);
      await updateDoc(autoRef, {
        valoracion: newRating, // Actualiza la valoración con la nueva calificación
      });
    } catch (error) {
      console.error("Error al actualizar la valoración:", error);
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

  const renderAlquiler = ({ item }) => (
    <View style={styles.alquilerContainer}>
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
        placeholder="Buscar auto en alquiler..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      {filteredAlquileres.length > 0 ? (
        <FlatList
          data={filteredAlquileres}
          renderItem={renderAlquiler}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.noResults}>No se encontraron autos en alquiler</Text>
      )}
    </View>
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
