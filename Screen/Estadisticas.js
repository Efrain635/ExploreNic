import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { BarChart } from 'react-native-chart-kit'; // Asegúrate de que esta librería esté instalada
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../database/firebaseconfig';  // Conexión Firebase

export default function Estadisticas() {
  const [loading, setLoading] = useState(true); // Indicador de carga
  const [dataNegocios, setDataNegocios] = useState({
    labels: [''],
    datasets: [{ data: [0] }]
  });
  const [dataFrecuencia, setDataFrecuencia] = useState({
    labels: [''],
    datasets: [{ data: [0] }]
  });

  // Cargar datos para gráfico de tipos de negocios
  useEffect(() => {
    const cargarDatosNegocios = async () => {
      try {
        const q = query(collection(db, "negocios")); // Suponiendo que tienes una colección de negocios
        const querySnapshot = await getDocs(q);
        const tipos = [];
        const cantidad = [];

        querySnapshot.forEach((doc) => {
          const datos = doc.data();
          const { tipo } = datos;
          if (!tipos.includes(tipo)) {
            tipos.push(tipo);
            cantidad.push(1);
          } else {
            const index = tipos.indexOf(tipo);
            cantidad[index] += 1;
          }
        });

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

  // Cargar datos para el gráfico de frecuencia de registros de usuario
  useEffect(() => {
    const cargarDatosFrecuencia = async () => {
      try {
        const q = query(collection(db, "usuarios")); // Suponiendo que tienes una colección de usuarios
        const querySnapshot = await getDocs(q);
        const fechas = [];
        const cantidad = [];

        querySnapshot.forEach((doc) => {
          const { fechaRegistro } = doc.data();
          const fecha = new Date(fechaRegistro.toDate());
          const mes = fecha.getMonth() + 1;
          const anio = fecha.getFullYear();
          const clave = `${anio}-${mes}`;

          if (!fechas.includes(clave)) {
            fechas.push(clave);
            cantidad.push(1);
          } else {
            const index = fechas.indexOf(clave);
            cantidad[index] += 1;
          }
        });

        setDataFrecuencia({
          labels: fechas,
          datasets: [{ data: cantidad }]
        });
      } catch (error) {
        console.error("Error al obtener los datos de registros: ", error);
      }
    };

    cargarDatosFrecuencia();
  }, []);

  // Cuando los datos estén listos, se quita el indicador de carga
  useEffect(() => {
    if (dataNegocios && dataFrecuencia) {
      setLoading(false);
    }
  }, [dataNegocios, dataFrecuencia]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Título de la pantalla */}
      <Text style={styles.title}>Estadísticas de Negocios y Registros</Text>

      {/* Gráfico de Tipos de Negocios */}
      <Text style={styles.subtitle}>Tipos de Negocios Registrados</Text>
      <BarChart
        data={dataNegocios}
        width={300}
        height={220}
        yAxisLabel="Cantidad"
        chartConfig={chartConfig}
        style={styles.chart}
      />

      {/* Gráfico de Frecuencia de Registros de Usuario */}
      <Text style={styles.subtitle}>Frecuencia de Registros de Usuario</Text>
      <BarChart
        data={dataFrecuencia}
        width={300}
        height={220}
        yAxisLabel="Cantidad"
        chartConfig={chartConfig}
        style={styles.chart}
      />
    </ScrollView>
  );
}

const chartConfig = {
  backgroundColor: "#0067C6",
  backgroundGradientFrom: "#0067C6",
  backgroundGradientTo: "#0067C6",
  decimalPlaces: 0, // No mostrar decimales
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726"
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
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