import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Dimensions, Button, Alert } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../database/firebaseconfig';
import { jsPDF } from 'jspdf';
import * as FileSystem from 'expo-file-system'; // Manejo de archivos
import * as Sharing from 'expo-sharing'; // Para compartir archivos
import { captureRef } from 'react-native-view-shot'; // Captura de imagen

export default function Estadisticas() {
  const [loading, setLoading] = useState(true);
  const [dataNegocios, setDataNegocios] = useState([]);
  const chartRef = useRef();

  const colecciones = [
    "Alojamiento", 
    "Alquiler de coches", 
    "Atracciones", 
    "Restaurantes", 
    "Bares", 
    "Guías turísticos"
  ];

  // Función para generar un color hexadecimal válido de 6 dígitos
  const generarColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  };

  useEffect(() => {
    const cargarDatosNegocios = async () => {
      try {
        const data = [];

        for (const coleccion of colecciones) {
          const q = collection(db, coleccion);
          const querySnapshot = await getDocs(q);
          data.push({
            name: coleccion,
            population: querySnapshot.size,
            color: generarColor(),
            legendFontColor: "#7F7F7F",
            legendFontSize: 13
          });
        }

        setDataNegocios(data);
      } catch (error) {
        console.error("Error al obtener los datos de negocios: ", error);
      }
      setLoading(false);
    };

    cargarDatosNegocios();
  }, []);

  // Función para generar y compartir el PDF
  const generarPDF = async () => {
    try {
      // Capturar el gráfico como imagen
      const uri = await captureRef(chartRef, {
        format: "png",
        quality: 1,
      });

      // Crear una instancia de jsPDF
      const doc = new jsPDF();
      doc.text("Estadísticas de Negocios", 10, 10);

      // Leer la imagen capturada y agregarla al PDF
      const chartImage = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      doc.addImage(`data:image/png;base64,${chartImage}`, "PNG", 10, 20, 180, 100);

      // Agregar datos de texto al PDF
      dataNegocios.forEach((item, index) => {
        doc.text(`${item.name}: ${item.population} negocios`, 10, 140 + index * 10);
      });

      // Generar el PDF como base64
      const pdfBase64 = doc.output('datauristring').split(',')[1];
      const fileUri = `${FileSystem.documentDirectory}reporte_negocios.pdf`;

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
      <Text style={styles.subtitle}>Cantidad de Negocios por Tipo</Text>
      <View ref={chartRef} collapsable={false}>
        <PieChart
          data={dataNegocios}
          width={Dimensions.get('window').width - 50} // Reducir el ancho del gráfico
          height={200} // Reducir la altura del gráfico
          chartConfig={chartConfig}
          accessor="population" // Muestra cantidad en lugar de porcentaje
          backgroundColor="transparent"
          paddingLeft="20"
          hasLegend={false} // Desactivar la leyenda dentro del gráfico
          style={styles.chart}
        />
      </View>
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
      <View style={styles.buttonContainer}>
        <Button title="Generar y Compartir PDF" onPress={generarPDF} />
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
  },
  legendContainer: {
    marginTop: 20,
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  legendColor: {
    width: 15,
    height: 15,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
});
