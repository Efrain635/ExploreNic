import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Dimensions, Button, Alert } from 'react-native';
import { PieChart, BarChart } from 'react-native-chart-kit'; // Importar gráfico de barras
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../database/firebaseconfig';
import { jsPDF } from 'jspdf';
import * as FileSystem from 'expo-file-system'; // Manejo de archivos
import * as Sharing from 'expo-sharing'; // Para compartir archivos
import { captureRef } from 'react-native-view-shot'; // Captura de imagen

export default function Estadisticas() {
  const [loading, setLoading] = useState(true);
  const [dataNegocios, setDataNegocios] = useState([]);
  const [barChartData, setBarChartData] = useState([]); // Datos para el gráfico de barras
  const pieChartRef = useRef();
  const barChartRef = useRef(); // Referencia para el gráfico de barras

  const colecciones = [
    'Alojamiento',
    'Alquiler de coches',
    'Atracciones',
    'Restaurantes',
    'Bares',
    'Guías turísticos',
  ];

  const coloresPastel = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFD4', '#FF9133'];
  const coloresBarras = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFD4', '#FF9133'];

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
            color: coloresPastel[i],
            legendFontColor: '#7F7F7F',
            legendFontSize: 13,
          });

          barChartDataPoints.push(querySnapshot.size);
        }

        setDataNegocios(data);
        setBarChartData({
          labels: colecciones,
          datasets: [{ data: barChartDataPoints }],
        });
      } catch (error) {
        console.error('Error al obtener los datos de negocios: ', error);
      }
      setLoading(false);
    };

    cargarDatosNegocios();
  }, []);

  const generarPDF = async (chartRef, type) => {
    try {
      const chartUri = await captureRef(chartRef, {
        format: 'png',
        quality: 1,
      });

      const doc = new jsPDF();
      doc.text(`Estadísticas de Negocios - Gráfico de ${type}`, 10, 10);

      const chartImage = await FileSystem.readAsStringAsync(chartUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      doc.addImage(`data:image/png;base64,${chartImage}`, 'PNG', 10, 20, 132, 145);

      if (type === "Barras") {
        // Mantener el listado de datos en el PDF para gráficos de barras
        dataNegocios.forEach((item, index) => {
          doc.text(`${item.name}: ${item.population} negocios`, 10, 175 + index * 10);
          // Tamaño de la imagen
          doc.addImage(`data:image/png;base64,${chartImage}`, 'PNG', 10, 20, 190, 145);
        });
      }

      const pdfBase64 = doc.output('datauristring').split(',')[1];
      const fileUri = `${FileSystem.documentDirectory}reporte_${type}.pdf`;

      await FileSystem.writeAsStringAsync(fileUri, pdfBase64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error('Error al generar o compartir el PDF: ', error);
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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Estadísticas de Registros</Text>
  
      {/* Gráfico de pastel */}
      <View style={styles.card}>
        <Text style={styles.subtitle}>Cantidad de Negocios por Tipo</Text>
        <View ref={pieChartRef} collapsable={false} style={styles.pieContainer}>
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
        </View>
        {/* Añadimos margen entre los gráficos y los botones */}
        <View style={styles.buttonContainer}>
          <Button title="Generar y Compartir PDF (Pastel)" onPress={() => generarPDF(pieChartRef, 'Pastel')} />
        </View>
      </View>
  
      {/* Gráfico de barras */}
      <View style={styles.card}>
        <Text style={styles.subtitle}>Comparación de Negocios por Tipo</Text>
        <View ref={barChartRef} collapsable={false}>
          <BarChart
            data={barChartData}
            width={Dimensions.get('window').width - 70}
            height={220}
            chartConfig={chartConfig}
            verticalLabelRotation={30}
          />
        </View>
        {/* Añadimos margen entre los gráficos y los botones */}
        <View style={styles.buttonContainer}>
          <Button title="Generar y Compartir PDF (Barras)" onPress={() => generarPDF(barChartRef, 'Barras')} />
        </View>
      </View>
  
      {/* Espacio al final */}
      <View style={styles.spaceEnd} />
    </ScrollView>
  );
}

const chartConfig = {
  backgroundColor: '#0067C6',
  backgroundGradientFrom: '#004c91',
  backgroundGradientTo: '#0067C6',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: { borderRadius: 16 },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#D3D3D3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20, // Añadir margen inferior al contenedor de cada gráfico para más separación
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10, // Espacio entre el título y el gráfico
  },
  pieContainer: {
    alignItems: 'center',
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
  },
  buttonContainer: {
    marginTop: 20,  // Espacio entre el gráfico y el botón
    marginBottom: 20,  // Espacio adicional al final de los botones
  },
  spaceEnd: {
    height: 30,  // Espacio al final
  },
});


