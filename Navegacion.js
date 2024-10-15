import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';

import Settings from './Screen/Settings';
import Home from './Screen/Home';
import Users from './Screen/Users';
import DetailHome from './Screen/DetailHome';
import AnotherDetailHome from './Screen/AnotherDetailsHome';
import Alojamiento from '../ExploreNic/Screen/Alojamiento';  // Nueva pantalla
import AlquilerCoches from './Screen/AlquilerCoches';  // Nueva pantalla
import Atracciones from './Screen/Atracciones';  // Nueva pantalla
import Restaurantes from './Screen/Restaurantes';  // Nueva pantalla
import Bares from './Screen/Bares';  // Nueva pantalla
import maps from './Screen/Mapa';
import Login from './Screen/Login';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarActiveTintColor: 'purple',
      }}
    >

      <Tab.Screen name='Menú' component={StackDetailHome}
        options={{
          tabBarLabel: 'Menú',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={30} color="black" />
          ),
        }}
      />

      <Tab.Screen name='Maps' component={maps}
        options={{
          tabBarLabel: 'Mapa',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="map" size={28} color="black" />
          ),
       }}
     />

      
      
      <Tab.Screen name='Setting' component={Settings}
        options={{
          tabBarLabel: 'Cofiguraión',
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="player-settings" size={28} color="black" />
          ),
        }}
      />

      <Tab.Screen name='Users' component={Users}
        options={{
          tabBarLabel: 'Users',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={30} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const DetailHomeNavigator = createStackNavigator();

function StackDetailHome() {
  return (
    <DetailHomeNavigator.Navigator
      initialRouteName='Categorías'>
      
      <DetailHomeNavigator.Screen
        name="Categorías"
        component={Home}>
      </DetailHomeNavigator.Screen>

      <DetailHomeNavigator.Screen
        name="DetailHome"
        component={DetailHome}>
      </DetailHomeNavigator.Screen>

      <DetailHomeNavigator.Screen
        name="AnotherDetailHome"
        component={AnotherDetailHome}>
      </DetailHomeNavigator.Screen>

      {/* Añadiendo la pantalla Alojamiento */}
      <DetailHomeNavigator.Screen
        name="AlojamientoScreen"
        component={Alojamiento}>
      </DetailHomeNavigator.Screen>

      {/* Añadiendo la pantalla Atracciones */}
      <DetailHomeNavigator.Screen
        name="AtraccionesScreen"
        component={Atracciones}>
      </DetailHomeNavigator.Screen>

      {/* Añadiendo la pantalla Atracciones */}
      <DetailHomeNavigator.Screen
        name="RestaurantesScreen"
        component={Restaurantes}>
      </DetailHomeNavigator.Screen>

      {/* Añadiendo la pantalla Atracciones */}
      <DetailHomeNavigator.Screen
        name="AlquilerScreen"
        component={AlquilerCoches}>
      </DetailHomeNavigator.Screen>

      {/* Añadiendo la pantalla Atracciones */}
      <DetailHomeNavigator.Screen
        name="BaresScreen"
        component={Bares}>
      </DetailHomeNavigator.Screen>

    </DetailHomeNavigator.Navigator>
  );
}

export default function Navigacion() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}