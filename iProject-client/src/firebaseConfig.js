// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDbuqiLf4fZITSrllq8JhBdVKOxBnSx7WM",
  authDomain: "idproject-1e9c9.firebaseapp.com",
  projectId: "idproject-1e9c9",
  storageBucket: "idproject-1e9c9.appspot.com",
  messagingSenderId: "36441120195",
  appId: "1:36441120195:web:52dae9d80fedf954807176",
};

// Initialize Firebase  
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp