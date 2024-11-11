import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../database/firebaseconfig';

export default function Estadisticas() {
  const [loading, setLoading] = useState(true);
  const [dataNegocios, setDataNegocios] = useState({
    labels: [],
    datasets: [{ data: [] }]
  });

  const colecciones = [
    "Alojamiento", 
    "Alquiler de coche", 
    "Atracciones", 
    "Restaurantes", 
    "Bares", 
    "Guías turísticos"
  ];

  useEffect(() => {
    const cargarDatosNegocios = async () => {
      try {
        const tipos = [];
        const cantidad = [];

        for (const coleccion of colecciones) {
          const q = collection(db, coleccion);
          const querySnapshot = await getDocs(q);

          tipos.push(coleccion);
          cantidad.push(querySnapshot.size);
        }

        setDataNegocios({
          labels: tipos,
          datasets: [{ data: cantidad }]
        });
      } catch (error) {
        console.error("Error al obtener los datos de negocios: ", error);
      }
    };

    cargarDatosNegocios();
  }, []);

  useEffect(() => {
    if (dataNegocios.labels.length > 0) {
      setLoading(false);
    }
  }, [dataNegocios]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>Estadísticas de Negocios</Text>
      <Text style={styles.subtitle}>Tipos de Negocios Registrados</Text>
      <BarChart
        data={dataNegocios}
        width={Dimensions.get('window').width - 20}
        height={300}
        yAxisLabel=" "
        yAxisSuffix=" negocios"
        fromZero={true}
        chartConfig={chartConfig}
        showBarTops={false}
        style={styles.chart}
        verticalLabelRotation={30}  // Rotar las etiquetas para mejorar la legibilidad
      />
    </ScrollView>
  );
}

const chartConfig = {
  backgroundColor: "#0067C6",
  backgroundGradientFrom: "#004c91",
  backgroundGradientTo: "#0067C6",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  barPercentage: 0.5,
  propsForBackgroundLines: {
    strokeWidth: 1,
    stroke: "#dfe6e9",
    strokeDasharray: "4",
  },
  style: {
    borderRadius: 16,
    padding: 10,
  },
  propsForLabels: {
    fontSize: 14,
    fontWeight: 'bold',
    fill: '#fff'
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  contentContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0067C6',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0067C6',
    marginVertical: 10,
  },
  chart: {
    marginVertical: 20,
    borderRadius: 16,
  }
});
