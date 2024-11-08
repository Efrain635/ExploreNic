import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const categories = [
    { id: '1', title: 'Alojamiento', image: require('../IMAGENES/alojamiento.jpg'), screen: 'AlojamientoScreen' },
    { id: '2', title: 'Alquiler de Coches', image: require('../IMAGENES/Alquiler de Coches.jpg'), screen: 'AlquilerScreen' },
    { id: '3', title: 'Atracciones', image: require('../IMAGENES/Atracciones.jpg'), screen: 'AtraccionesScreen' },
    { id: '4', title: 'Restaurantes', image: require('../IMAGENES/Restaurantes.jpg'), screen: 'RestaurantesScreen' },
    { id: '5', title: 'Bares', image: require('../IMAGENES/Bares.jpg'), screen: 'BaresScreen' },
    { id: '6', title: 'Guías Turisticos', image: require('../IMAGENES/Guía de Turista.jpg'), screen: 'GuiasTurismoScreen' },
];

const Home = () => {
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate(item.screen)}>
            <Image source={item.image} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                numColumns={2}
            />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    card: {
        backgroundColor: '#0067C6',
        flex: 1,
        margin: 10,
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardImage: {
        width: 120, // Aumenta el tamaño de la imagen
        height: 120, // Aumenta el tamaño de la imagen
        resizeMode: 'contain',
        marginBottom: 10,
    },
    cardTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
