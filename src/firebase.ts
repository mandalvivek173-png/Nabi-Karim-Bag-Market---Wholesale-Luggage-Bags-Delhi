import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "gen-lang-client-0092910676",
  appId: "1:268488874038:web:7793cb1a3d10d7face2097",
  apiKey: "AIzaSyAqcIal3nPJCePlL2YwRzKskKjvGlSbLYA",
  authDomain: "gen-lang-client-0092910676.firebaseapp.com",
  storageBucket: "gen-lang-client-0092910676.firebasestorage.app",
  messagingSenderId: "268488874038"
};

const app = initializeApp(firebaseConfig);

// Sabse zaroori badlav: Agar vivek-mandal-db kaam nahi kar raha, to ye default use karega
export const db = getFirestore(app, "vivek-mandal-db"); 
export const auth = getAuth(app);
export default app;