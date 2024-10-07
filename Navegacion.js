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
import Alojamiento from './Screen/Alojamiento';  // Nueva pantalla
import AlquilerCoches from './Screen/AlquilerCoches';  // Nueva pantalla
import Atracciones from './Screen/Atracciones';  // Nueva pantalla
import Restaurantes from './Screen/Restaurantes';  // Nueva pantalla
import Bares from './Screen/Bares';  // Nueva pantalla

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
          tabBarLabel: 'HomeSreen',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={30} color="black" />
          ),
        }}
      />

      <Tab.Screen name='Alojamiento' component={Alojamiento}
        options={{
          tabBarLabel: 'Alojamiento',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bed" size={30} color="black" />
          ),
        }}
      />

      <Tab.Screen name='AlquilerCoches' component={AlquilerCoches}
        options={{
          tabBarLabel: 'Alquiler de Coches',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="car" size={30} color="black" />
          ),
        }}
      />

      <Tab.Screen name='Atracciones' component={Atracciones}
        options={{
          tabBarLabel: 'Atracciones',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="camera" size={30} color="black" />
          ),
        }}
      />

      <Tab.Screen name='Restaurantes' component={Restaurantes}
        options={{
          tabBarLabel: 'Restaurantes',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="cutlery" size={30} color="black" />
          ),
        }}
      />

      <Tab.Screen name='Bares' component={Bares}
        options={{
          tabBarLabel: 'Bares',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="glass" size={30} color="black" />
          ),
        }}
      />

      <Tab.Screen name='Setting' component={Settings}
        options={{
          tabBarLabel: 'Settings',
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
