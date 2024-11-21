import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, Linking, ActivityIndicator } from 'react-native';
import { Rating } from 'react-native-ratings';
import { collection, getDocs, updateDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../database/firebaseconfig'; 

const VerNegocios = () => {
  const [negocios, setNegocios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Función para obtener los negocios desde Firebase
  const fetchNegocios = async () => {
    setLoading(true);
    try {
      const categories = [
        'Alojamiento',
        'Alquiler de coches',
        'Atracciones',
        'Restaurantes',
        'Bares',
        'Guias turísticos',
      ];

      let allNegocios = [];

      // Usamos un bucle para obtener los negocios de todas las categorías
      for (let category of categories) {
        const querySnapshot = await getDocs(collection(db, category));
        const negociosData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          
          // Si no existe la valoración, la agregamos con valor 4
          if (!data.hasOwnProperty('valoracion')) {
            setDoc(doc.ref, { valoracion: 4 }, { merge: true }); // Esto agrega el campo en Firebase si no existe
          }

          return {
            id: doc.id,
            categoria: category,
            valoracion: data.valoracion || 4, // Si no tiene valoracion, se asigna 4
            ...data,
          };
        });
        allNegocios = [...allNegocios, ...negociosData];
      }

      console.log('Negocios obtenidos:', allNegocios);
      setNegocios(allNegocios);
    } catch (error) {
      console.error("Error al obtener negocios:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNegocios();
  }, []);

  // Filtrar los negocios según la búsqueda
  const filteredNegocios = negocios.filter((negocio) =>
    negocio.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Función para actualizar la valoración en Firebase
  const handleRating = async (negocioId, newRating, categoria) => {
    try {
      const negocioRef = doc(db, categoria, negocioId);

      // Actualizamos o agregamos el campo valoracion en el documento
      await updateDoc(negocioRef, {
        valoracion: newRating, 
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

  const renderNegocio = ({ item }) => (
    <View style={styles.negocioContainer}>
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
        onFinishRating={(rating) => handleRating(item.id, rating, item.categoria)} // Actualiza la valoración cuando el usuario califique
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
        placeholder="Buscar negocio..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      {filteredNegocios.length > 0 ? (
        <FlatList
          data={filteredNegocios}
          renderItem={renderNegocio}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.noResults}>No se encontraron negocios</Text>
      )}
    </View>
  );
};

export default VerNegocios;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  negocioContainer: {
    marginBottom: 20,
    backgroundColor: '#003D73',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#fff',
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
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  servicio: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  link: {
    color: '#00aaff',
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
