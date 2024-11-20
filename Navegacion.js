import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

// Pantallas
import Settings from './Screen/Settings';
import Home from './Screen/Home';
import Users from './Screen/Users';
import DetailHome from './Screen/DetailHome';
import AnotherDetailHome from './Screen/AnotherDetailsHome';
import Maps from './Screen/Mapa';
import Estadisticas from './Screen/Estadisticas';
import Alojamiento from './Screen/Alojamiento';
import AlquilerCoches from './Screen/AlquilerCoches';
import Atracciones from './Screen/Atracciones';
import Restaurantes from './Screen/Restaurantes';
import Bares from './Screen/Bares';
import GuiasTurismo from './Screen/GuiasTurismo';
import VerNegocios from './Screen/VerNegocios';
import Login from './Screen/Login';
import CrearUsuario from './Screen/CrearUsuario';
import OpciondeCrearUsuario from './Screen/OpciondeCrearUsuario';
import RegistroNegocio from './Screen/RegistroNegocio';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        tabBarActiveTintColor: 'purple',
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={StackDetailHome}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={30} color={color} />,
        }}
      />
      <Tab.Screen
        name="Maps"
        component={Maps}
        options={{
          tabBarLabel: 'Mapa',
          tabBarIcon: ({ color }) => <FontAwesome name="map" size={28} color={color} />,
        }}
      />
      <Tab.Screen
        name="Estadisticas"
        component={Estadisticas}
        options={{
          tabBarLabel: 'Estadísticas',
          tabBarIcon: ({ color }) => <AntDesign name="areachart" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Configuración',
          tabBarIcon: ({ color }) => <Fontisto name="player-settings" size={28} color={color} />,
        }}
      />
      <Tab.Screen
        name="Users"
        component={Users}
        options={{
          tabBarLabel: 'Usuarios',
          tabBarIcon: ({ color }) => <Feather name="user" size={30} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

const StackLogin = createStackNavigator();
function StackHomeLogin() {
  return (
    <StackLogin.Navigator initialRouteName="Login">
      <StackLogin.Screen name="Login" component={Login} />
      <StackLogin.Screen name="MyTabs" component={MyTabs} />
      <StackLogin.Screen name="OpciondeCrearUsuario" component={OpciondeCrearUsuario} />
      <StackLogin.Screen name="CrearUsuario" component={CrearUsuario} />
      <StackLogin.Screen name="RegistroNegocio" component={RegistroNegocio} />
    </StackLogin.Navigator>
  );
}

const DetailHomeNavigator = createStackNavigator();
function StackDetailHome() {
  return (
    <DetailHomeNavigator.Navigator initialRouteName="Home">
      <DetailHomeNavigator.Screen name="Home" component={Home} />
      <DetailHomeNavigator.Screen name="DetailHome" component={DetailHome} />
      <DetailHomeNavigator.Screen name="AnotherDetailHome" component={AnotherDetailHome} />
      <DetailHomeNavigator.Screen name="AlojamientoScreen" component={Alojamiento} />
      <DetailHomeNavigator.Screen name="AtraccionesScreen" component={Atracciones} />
      <DetailHomeNavigator.Screen name="RestaurantesScreen" component={Restaurantes} />
      <DetailHomeNavigator.Screen name="AlquilerScreen" component={AlquilerCoches} />
      <DetailHomeNavigator.Screen name="BaresScreen" component={Bares} />
      <DetailHomeNavigator.Screen name="GuiasTurismoScreen" component={GuiasTurismo} />
      <DetailHomeNavigator.Screen name="VerNegociosScreen" component={VerNegocios} />
    </DetailHomeNavigator.Navigator>
  );
}


export default function Navigacion() {
  return (
    <NavigationContainer>
      <StackHomeLogin />
    </NavigationContainer>
  );
}
