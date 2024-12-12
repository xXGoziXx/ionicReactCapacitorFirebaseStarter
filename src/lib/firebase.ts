import { FirebaseApp, initializeApp } from "firebase/app";
import { FirebaseFirestore } from "@capacitor-firebase/firestore";
import { FirebaseAuthentication, Persistence } from "@capacitor-firebase/authentication";
import { Capacitor } from "@capacitor/core";

/**
 * Firebase configuration interface
 */
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

/**
 * Checks if Firebase emulator should be used
 */
export const useEmulator = (): boolean =>
  import.meta.env.VITE_USE_FIREBASE_EMULATOR?.toLowerCase?.() === "true";

/**
 * Gets Firebase configuration from environment variables
 */
const getFirebaseConfig = (): FirebaseConfig => ({
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASEURL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
});

let firebaseApp: FirebaseApp;

/**
 * Initializes Firebase with appropriate configuration
 * @throws {Error} If Firebase initialization fails
 */
export const initializeFirebase = async (): Promise<void> => {
  try {
    if (firebaseApp) return;

    firebaseApp = initializeApp(getFirebaseConfig());

    if (!Capacitor.isNativePlatform()) {
      if (useEmulator()) {
        await FirebaseAuthentication.useEmulator({
          host: "localhost",
          port: 9099
        });
        await FirebaseFirestore.useEmulator({
          host: "localhost",
          port: 8080
        });
      }

      await FirebaseFirestore.enableNetwork();
      await FirebaseAuthentication.setPersistence({
        persistence: Persistence.IndexedDbLocal
      });
    }
  } catch (error) {
    throw new Error(`Firebase initialization failed: ${error}`);
  }
};
