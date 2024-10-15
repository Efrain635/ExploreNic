import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  const region = {
    latitude: 12.8654, // Coordenadas de Nicaragua
    longitude: -85.2072,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{ latitude: 12.8654, longitude: -85.2072 }}
          title={"Ubicación"}
          description={"Descripción de la ubicación."}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;
