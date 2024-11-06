import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCEyEQZ8kw6_69J1xdvWm7_tlZBcE2D33Y",
  authDomain: "explorenic-60bca.firebaseapp.com",
  projectId: "explorenic-60bca",
  storageBucket: "explorenic-60bca.appspot.com",
  messagingSenderId: "180292086553",
  appId: "1:180292086553:web:c06c75a8f107dc669f7388"
};

// Inicializar Firebase 
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Inicializar Firestore
const db = getFirestore(app);

export { db };
