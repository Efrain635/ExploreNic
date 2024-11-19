import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Dimensions, Button, Alert } from 'react-native';
import { PieChart, BarChart } from 'react-native-chart-kit';  // Importar gráfico de barras
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../database/firebaseconfig';
import { jsPDF } from 'jspdf';
import * as FileSystem from 'expo-file-system'; // Manejo de archivos
import * as Sharing from 'expo-sharing'; // Para compartir archivos
import { captureRef } from 'react-native-view-shot'; // Captura de imagen

export default function Estadisticas() {
  const [loading, setLoading] = useState(true);
  const [dataNegocios, setDataNegocios] = useState([]);
  const [barChartData, setBarChartData] = useState([]);  // Datos para el gráfico de barras
  const pieChartRef = useRef();
  const barChartRef = useRef();  // Referencia para el gráfico de barras

  const colecciones = [
    "Alojamiento", 
    "Alquiler de coches", 
    "Atracciones", 
    "Restaurantes", 
    "Bares", 
    "Guías turísticos"
  ];

  // Colores predefinidos para las barras y el gráfico de pastel
  const coloresPastel = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#33FFD4", "#FF9133"
  ];

  const coloresBarras = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#33FFD4", "#FF9133"
  ];

  useEffect(() => {
    const cargarDatosNegocios = async () => {
      try {
        const data = [];
        const barChartDataPoints = [];

        for (let i = 0; i < colecciones.length; i++) {
          const coleccion = colecciones[i];
          const q = collection(db, coleccion);
          const querySnapshot = await getDocs(q);
          data.push({
            name: coleccion,
            population: querySnapshot.size,
            color: coloresPastel[i],  // Asignar color específico para cada tipo de negocio
            legendFontColor: "#7F7F7F",
            legendFontSize: 13
          });

          // Para el gráfico de barras, se agregan los valores de la población de cada colección
          barChartDataPoints.push(querySnapshot.size);
        }

        setDataNegocios(data);

        setBarChartData({
          labels: colecciones, // Etiquetas de las colecciones
          datasets: [
            {
              data: barChartDataPoints,  // Datos de la población por tipo de negocio
              color: (opacity = 1) => coloresBarras, // Usamos la lista de colores para las barras
              strokeWidth: 2,
            }
          ]
        });

      } catch (error) {
        console.error("Error al obtener los datos de negocios: ", error);
      }
      setLoading(false);
    };

    cargarDatosNegocios();
  }, []);

  // Función para generar y compartir el PDF
  const generarPDF = async (chartRef, type) => {
    try {
      // Capturar el gráfico como imagen
      const chartUri = await captureRef(chartRef, {
        format: "png",
        quality: 1,
      });

      // Crear una instancia de jsPDF
      const doc = new jsPDF();
      doc.text(`Estadísticas de Negocios - Gráfico de ${type}`, 10, 10);

      // Leer la imagen capturada y agregarla al PDF
      const chartImage = await FileSystem.readAsStringAsync(chartUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      doc.addImage(`data:image/png;base64,${chartImage}`, "PNG", 10, 20, 180, 140);

      // Agregar datos de texto al PDF
      dataNegocios.forEach((item, index) => {
        doc.text(`${item.name}: ${item.population} negocios`, 10, 170 + index * 10);
      });

      // Generar el PDF como base64
      const pdfBase64 = doc.output('datauristring').split(',')[1];
      const fileUri = `${FileSystem.documentDirectory}reporte_${type}.pdf`;

      // Guardar el archivo PDF
      await FileSystem.writeAsStringAsync(fileUri, pdfBase64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Compartir el archivo PDF
      await Sharing.shareAsync(fileUri);

    } catch (error) {
      console.error("Error al generar o compartir el PDF: ", error);
      Alert.alert('Error', 'No se pudo generar o compartir el PDF.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Estadísticas de Registros</Text>

      {/* Tarjeta para el gráfico de pastel */}
      <View style={styles.card}>
        <Text style={styles.subtitle}>Cantidad de Negocios por Tipo</Text>
        <View ref={pieChartRef} collapsable={false}>
          <PieChart
            data={dataNegocios}
            width={Dimensions.get('window').width - 50}
            height={200}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="20"
            hasLegend={false}
            style={styles.chart}
          />
        </View>

        {/* Leyenda */}
        <View style={styles.legendContainer}>
          {dataNegocios.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>
                {item.name}: {item.population} negocios
              </Text>
            </View>
          ))}
        </View>

        {/* Botón para generar y compartir el PDF del gráfico de pastel */}
        <View style={styles.buttonContainer}>
          <Button title="Generar y Compartir PDF (Pastel)" onPress={() => generarPDF(pieChartRef, 'Pastel')} />
        </View>
      </View>

      {/* Tarjeta para el gráfico de barras */}
      <View style={styles.card}>
        <Text style={styles.subtitle}>Comparación de Negocios por Tipo</Text>
        <View ref={barChartRef} collapsable={false}>
          <BarChart
            data={barChartData}
            width={Dimensions.get('window').width - 70}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 102, 204, ${opacity})`, // Azul para barras
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Etiquetas negras
              style: {
                borderRadius: 16,
              },
            }}
            verticalLabelRotation={30}
            fromZero={true}
            showBarTops={false} // Quitar la línea superior de las barras
            style={styles.chart}
          />
        </View>

        {/* Botón para generar y compartir el PDF del gráfico de barras */}
        <View style={styles.buttonContainer}>
          <Button
            title="Generar y Compartir PDF (Barras)"
            onPress={() => generarPDF(barChartRef, 'Barras')}
          />
        </View>
      </View>

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
  style: {
    borderRadius: 16,
  },
};

const barChartConfig = {
  backgroundColor: "#0067C6",
  backgroundGradientFrom: "#004c91",
  backgroundGradientTo: "#0067C6",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 102, 204, ${opacity})`,  // Cambié a un color neutro para las barras
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#D3D3D3', // Fondo gris
  },
  contentContainer: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
  },
  card: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  legendContainer: {
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  legendColor: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 14,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 10,
  },
});

