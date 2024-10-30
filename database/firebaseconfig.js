import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDOjx97YM3c4dHTYfeDsnsQUn7piIBONC4",
  authDomain: "explorenic-d5f09.firebaseapp.com",
  projectId: "explorenic-d5f09",
  storageBucket: "explorenic-d5f09.firebasestorage.app",
  messagingSenderId: "392042621571",
  appId: "1:392042621571:web:05a7b4ff0eda3ce899c9b6",
  measurementId: "G-WHJ66XXR18"
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);