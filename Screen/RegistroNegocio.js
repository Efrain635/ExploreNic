import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../database/firebaseconfig';
import { collection, addDoc } from 'firebase/firestore';
import MapView, { Marker } from 'react-native-maps';
import { launchImageLibrary } from 'react-native-image-picker';

export default function RegistroNegocio() {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('Alojamiento');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState({
    latitude: 12.8654,
    longitude: -85.2072,
  });
  const [markerVisible, setMarkerVisible] = useState(false);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState(['', '', '', '', '']);
  const [imagenes, setImagenes] = useState([]);
  const [cargando, setCargando] = useState(false);

  const handleRegistro = async () => {
    try {
      setCargando(true);
      await addDoc(collection(db, 'negocios'), {
        nombre,
        tipo,
        descripcion,
        ubicacion,
        servicios: serviciosSeleccionados.filter(servicio => servicio !== ''),
        imagenes,
      });
      Alert.alert('Éxito', 'Negocio registrado con éxito');
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
    const options = {
      mediaType: 'photo',
      selectionLimit: 0,
    };

    try {
      const response = await launchImageLibrary(options);
      
      if (response.didCancel) {
        console.log('El usuario canceló la selección de imágenes');
      } else if (response.errorCode) {
        Alert.alert('Error en la selección de imágenes', response.errorMessage);
      } else {
        setImagenes(response.assets);
      }
    } catch (error) {
      console.error('Error al seleccionar imágenes:', error);
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
      </Picker>

      <Text style={styles.label}>Servicios ofrecidos:</Text>
      {serviciosSeleccionados.map((servicio, index) => (
        <Picker
          key={index}
          selectedValue={servicio}
          onValueChange={(itemValue) => actualizarServicio(index, itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione un servicio" value="" />
          <Picker.Item label="Wi-Fi" value="Wi-Fi" />
          <Picker.Item label="Desayuno" value="Desayuno" />
          <Picker.Item label="Almuerzo" value="Almuerzo" />
          <Picker.Item label="Cena" value="Cena" />
          <Picker.Item label="Estacionamiento" value="Estacionamiento" />
          <Picker.Item label="Guia turistico" value="Guia turistico" />
          <Picker.Item label="Recepción 24 horas" value="Recepción 24 horas" />
          <Picker.Item label="Transporte" value="Transporte" />
        </Picker>
      ))}

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
  label: {
    color: '#fff',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: 300,
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
});
