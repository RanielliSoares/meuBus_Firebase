import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5hveyAbSPVAtaCMT9NZzV-g_ZSXHxanw",
  authDomain: "meubus-4b29e.firebaseapp.com",
  databaseURL: "https://meubus-4b29e-default-rtdb.firebaseio.com",
  projectId: "meubus-4b29e",
  storageBucket: "meubus-4b29e.firebasestorage.app",
  messagingSenderId: "686476760651",
  appId: "1:686476760651:web:8891be287fa8e047a09fce"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
