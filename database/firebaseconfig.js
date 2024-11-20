import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Agrega la importación de Firestore
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCEyEQZ8kw6_69J1xdvWm7_tlZBcE2D33Y",
  authDomain: "explorenic-60bca.firebaseapp.com",
  projectId: "explorenic-60bca",
  storageBucket: "explorenic-60bca.appspot.com",
  messagingSenderId: "180292086553",
  appId: "1:180292086553:web:c06c75a8f107dc669f7388"
};

// Verifica si Firebase ya está inicializado
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(); // Obtiene la app ya inicializada
}

// Inicializa Auth con persistencia usando AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Inicializa Firestore
const db = getFirestore(app); // Aquí inicializas Firestore

export { auth, db }; // Exporta tanto auth como db
