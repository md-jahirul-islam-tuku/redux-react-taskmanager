
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6pdASPl3hZ7xpmJuiX4862nBLruOXPY0",
  authDomain: "redux-react-taskmanager.firebaseapp.com",
  projectId: "redux-react-taskmanager",
  storageBucket: "redux-react-taskmanager.firebasestorage.app",
  messagingSenderId: "713112038368",
  appId: "1:713112038368:web:b4f808be90cc63be951985"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);