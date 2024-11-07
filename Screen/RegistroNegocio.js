import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../database/firebaseconfig';
import { collection, addDoc } from 'firebase/firestore';
import MapView, { Marker } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';

export default function RegistroNegocio() {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('Alojamiento');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState({
    latitude: 12.8654,
    longitude: -85.2072,
  });
  const [markerVisible, setMarkerVisible] = useState(false);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState(['', '']);
  const [imagenes, setImagenes] = useState([]);
  const [cargando, setCargando] = useState(false);

  const handleRegistro = async () => {
    try {
      setCargando(true);
  
      // Usamos el valor de `tipo` para crear la colección correspondiente
      await addDoc(collection(db, tipo), {
        nombre,
        tipo,
        descripcion,
        ubicacion,
        servicios: serviciosSeleccionados.filter(servicio => servicio !== ''),
        imagenes: imagenes.map(img => img.uri),
      });
  
      Alert.alert('Éxito', 'Negocio registrado con éxito');
  
      // Reiniciamos los campos de entrada
      setNombre('');
      setTipo('Alojamiento');
      setDescripcion('');
      setUbicacion({ latitude: 12.8654, longitude: -85.2072 });
      setMarkerVisible(false);
      setServiciosSeleccionados(['', '', '', '', '']);
      setImagenes([]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar el negocio');
    } finally {
      setCargando(false);
    }
  };
  

  const onMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setUbicacion(coordinate);
    setMarkerVisible(true);
  };

  const actualizarServicio = (index, value) => {
    const nuevosServicios = [...serviciosSeleccionados];
    nuevosServicios[index] = value;
    setServiciosSeleccionados(nuevosServicios);
  };

  const seleccionarImagenes = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled) {
      setImagenes(result.assets);
    } else {
      Alert.alert('Error', 'No se pudo seleccionar las imágenes');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
      <Text style={styles.title}>Registrar Negocio</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del negocio"
        value={nombre}
        onChangeText={setNombre}
      />
      <Text style={styles.label}>Tipo de negocio:</Text>
      <Picker
        selectedValue={tipo}
        onValueChange={(itemValue) => setTipo(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Alojamiento" value="Alojamiento" />
        <Picker.Item label="Alquiler de coches" value="Alquiler de coches" />
        <Picker.Item label="Atracciones" value="Atracciones" />
        <Picker.Item label="Restaurantes" value="Restaurantes" />
        <Picker.Item label="Bares" value="Bares" />
        <Picker.Item label="Guías turísticos" value="Guías turísticos" />
      </Picker>

      <Text style={styles.label}>Servicios ofrecidos:</Text>

        {serviciosSeleccionados.map((servicio, index) => (
          <View key={index} style={styles.serviceContainer}>
            <TextInput
              style={styles.input}
              placeholder="Escriba un servicio"
              value={servicio}
              onChangeText={(text) => actualizarServicio(index, text)}
            />
          </View>
        ))}

        <View style={styles.buttonContainer}>
          <Button 
            title="Agregar otro servicio" 
            onPress={() => setServiciosSeleccionados([...serviciosSeleccionados, ''])} 
          />
        </View>

      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
      />

      <Text style={styles.label}>Ubicación:</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: ubicacion.latitude,
          longitude: ubicacion.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={onMapPress}
      >
        {markerVisible && <Marker coordinate={ubicacion} title="Ubicación seleccionada" />}
      </MapView>

      <Button title="Seleccionar Imágenes" onPress={seleccionarImagenes} />

      <FlatList
        data={imagenes}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={styles.image} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <View style={styles.buttonContainer}>
        <Button title="Registrar" onPress={handleRegistro} disabled={cargando} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0067C6',
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 5,
  },
  picker: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  map: {
    height: 200,
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  buttonContainer: {
    marginVertical: 20,
  },
  serviceContainer: {
    marginBottom: 10,
  },
  buttonContainer: {
    marginVertical: 20,
  },
});