// Flora Pharmacy - Official Firebase Configuration & SDK Initialization
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as fbSignOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNqvu5FvvjhCyQIVlTD1i9xsuDdlSeYYc",
  authDomain: "flora-pharmacy.firebaseapp.com",
  projectId: "flora-pharmacy",
  storageBucket: "flora-pharmacy.firebasestorage.app",
  messagingSenderId: "827331700159",
  appId: "1:827331700159:web:37e0102504d9dfd3942d0a",
  measurementId: "G-EHR9RJMPVH"
};

// Initialize Firebase Core
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Firestore Database for Live Cloud Orders & Stock
export const db = getFirestore(app);

// Initialize Firebase Auth for Customers & Pharmacist
export const auth = getAuth(app);

// Google Auth Provider for 1-Click Customer Google OAuth
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { signInWithPopup, fbSignOut, onAuthStateChanged };

// Initialize Firebase Analytics with browser support check
export let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
      console.log("🔥 Firebase Analytics & Cloud Firestore active for Flora Pharmacy!");
    }
  }).catch((err) => {
    console.warn("Firebase Analytics not supported in this environment:", err);
  });
}
