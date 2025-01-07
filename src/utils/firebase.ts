import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBPaib_k7P_bvoVDZuUOKNwhcA5sJ9Keqo",
    authDomain: "social-media-app-56.firebaseapp.com",
    projectId: "social-media-app-56",
    storageBucket: "social-media-app-56.firebasestorage.app",
    messagingSenderId: "150932583415",
    appId: "1:150932583415:web:01a08d8e25944449b1b4f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const db = getFirestore()
const storage = getStorage(app)

export { auth, provider, db, storage }