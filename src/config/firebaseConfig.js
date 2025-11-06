// app/config/firebase.ts
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCuLXzQS1XdnrdEbyihNHENKSKzXkFAjig",
    authDomain: "isicommerce-72aa6.firebaseapp.com",
    projectId: "isicommerce-72aa6",
    storageBucket: "isicommerce-72aa6.firebasestorage.app",
    messagingSenderId: "493297209568",
    appId: "1:493297209568:web:ed00f0e3fc3beb2c614085",
    measurementId: "G-CT9R0FXN5G"
};

// Initialize Firebase

let app;
let auth;
let db;

try {
    // Initialisation de Firebase
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);

    console.log("Firebase initialisé avec succès.");
} catch (error) {
    console.error("Erreur lors de l'initialisation de Firebase :", error);
    // Vous pouvez également utiliser Alert pour afficher l'erreur à l'utilisateur
}

export { app, auth, db };
