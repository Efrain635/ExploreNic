import React from 'react';

import {View, Image, StyleSheet, Text} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

// Iconos
import Settings from './Screen/Settings'; // Pantalla de Configuracion
import Home from './Screen/Home'; // Pantalla de Home
import Users from './Screen/Users'; // Pantalla de Usuario
import DetailHome from './Screen/DetailHome';
import AnotherDetailHome from './Screen/AnotherDetailsHome';
import maps from './Screen/Mapa'; // Pantalla de Maps

//Pantallas
import Alojamiento from '../ExploreNic/Screen/Alojamiento';  // Pantalla de Servios de Alojamiento
import AlquilerCoches from './Screen/AlquilerCoches';  // Pantalla de Servios de Alquiler de Coches
import Atracciones from './Screen/Atracciones';  // Pantalla de Servios de Atracciones
import Restaurantes from './Screen/Restaurantes';  // Pantalla de Servios de Restaurantes
import Bares from './Screen/Bares';  // Pantalla de Servios de Bares


import Login from './Screen/Login'; // Inicio de Seccion
import CrearUsuario from './Screen/CrearUsuario'; // Crear Usuario
import RegistroNegocio from './Screen/CrearUsuariodeNegocio'; // Crear Usurio de Negocio
import OpciondeCrearUsuario from './Screen/OpciondeCrearUsuario';


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarActiveTintColor: 'purple',
      }}
    >

      <Tab.Screen name='Home' component={StackDetailHome}
        options={{
          tabBarLabel: 'Home',
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

      <Tab.Screen name='RegistroNegocio' component={RegistroNegocio}
        options={{
          tabBarLabel: 'RegistrarNegocio',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="solution1" size={24} color="black" />
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

const stackLogin = createStackNavigator();
function StackHomeLogin() {
  return (
    <stackLogin.Navigator initialRouteName='Login'>
      
      <stackLogin.Screen
        name="Login"
        component={Login}>
      </stackLogin.Screen>

      <stackLogin.Screen
        name="MyTabs"
        component={MyTabs}>
      </stackLogin.Screen>

      <stackLogin.Screen
        name="OpciondeCrearUsuario"
        component={OpciondeCrearUsuario}>
      </stackLogin.Screen>

      <stackLogin.Screen
        name="CrearUsuario"
        component={CrearUsuario}>
      </stackLogin.Screen>

    </stackLogin.Navigator>
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

      {/* Añadiendo la pantalla Home */}
      <DetailHomeNavigator.Screen
        name="AtraccionesScreen"
        component={Atracciones}>
      </DetailHomeNavigator.Screen>

      {/* Añadiendo la pantalla Restauranteas */}
      <DetailHomeNavigator.Screen
        name="RestaurantesScreen"
        component={Restaurantes}>
      </DetailHomeNavigator.Screen>

      {/* Añadiendo la pantalla AlquilerCoches */}
      <DetailHomeNavigator.Screen
        name="AlquilerScreen"
        component={AlquilerCoches}>
      </DetailHomeNavigator.Screen>

      {/* Añadiendo la pantalla Bares */}
      <DetailHomeNavigator.Screen
        name="BaresScreen"
        component={Bares}>
      </DetailHomeNavigator.Screen>

      {/* Añadiendo la pantalla Bares */}
      <DetailHomeNavigator.Screen
        name="RegistroNegocioScreen"
        component={RegistroNegocio}>
      </DetailHomeNavigator.Screen>

    </DetailHomeNavigator.Navigator>
  );
}

export default function Navigacion() {
  return (
    <NavigationContainer>
      <StackHomeLogin/>
    </NavigationContainer>
  );
}