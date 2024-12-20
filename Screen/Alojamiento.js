import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, Linking, ActivityIndicator } from 'react-native';
import { Rating } from 'react-native-ratings';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../database/firebaseconfig'; 

const Alojamiento = () => {
  const [alojamientos, setAlojamientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Función para obtener alojamientos desde Firebase
  const fetchAlojamientos = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'Alojamiento'));
      const alojamientosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      setAlojamientos(alojamientosData);
    } catch (error) {
      console.error("Error al obtener alojamientos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlojamientos();
  }, []);

  // Filtrar los alojamientos según la búsqueda
  const filteredAlojamientos = alojamientos.filter((alojamiento) =>
    alojamiento.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Función para actualizar la valoración en Firebase
  const handleRating = async (alojamientoId, newRating) => {
    try {
      const alojamientoRef = doc(db, 'Alojamiento', alojamientoId);
      await updateDoc(alojamientoRef, {
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

  const renderAlojamiento = ({ item }) => (
    <View style={styles.alojamientoContainer}>
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
        placeholder="Buscar alojamiento..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      {filteredAlojamientos.length > 0 ? (
        <FlatList
          data={filteredAlojamientos}
          renderItem={renderAlojamiento}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.noResults}>No se encontraron alojamientos</Text>
      )}
    </View>
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
    marginBottom: 20,
    backgroundColor: '#003D73', // Fondo azul oscuro para la tarjeta
    borderRadius: 10, // Bordes redondeados para las tarjetas
    padding: 15, // Relleno dentro de la tarjeta
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5, // Sombra para efectos 3D en Android
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Color de texto blanco para resaltar sobre el fondo oscuro
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#fff', // Color de texto blanco
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
    color: '#fff', // Títulos en blanco para contraste con el fondo oscuro
    marginTop: 20,
    marginBottom: 10,
  },
  servicio: {
    fontSize: 16,
    color: '#fff', // Color de texto blanco para los servicios
    marginBottom: 5,
  },
  link: {
    color: '#00aaff', // Color de enlace para hacerlo destacar
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
