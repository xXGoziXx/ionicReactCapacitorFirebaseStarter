import { FirebaseApp, initializeApp } from "firebase/app";
import { FirebaseFirestore } from "@capacitor-firebase/firestore";
import { FirebaseAuthentication, Persistence } from "@capacitor-firebase/authentication";
import { Capacitor } from "@capacitor/core";
import { serverTimestamp, Timestamp } from 'firebase/firestore';
import { DEFAULT_USER } from '../constants/constants';
import { User } from '../models/User';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

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
    import.meta.env.VITE_USE_FIREBASE_EMULATOR?.toLowerCase?.() === 'true';

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
    appId: import.meta.env.VITE_FIREBASE_APPID
});

let firebaseApp: FirebaseApp;

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
        // [::1] is the IPv6 localhost address.
        window.location.hostname === '[::1]' ||
        // 127.0.0.0/8 are considered localhost for IPv4.
        window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
        )
);

/**
 * Initializes Firebase with appropriate configuration
 * @throws {Error} If Firebase initialization fails
 */
export const initializeFirebase = async (): Promise<void> => {
    try {
        if (firebaseApp) return;

        firebaseApp = initializeApp(getFirebaseConfig());

        if (!Capacitor.isNativePlatform()) {
                if (
                useEmulator() &&
                isLocalhost
            ) {
                console.log('**********Using emulator**********');
                // Initialize Functions emulator
                const functions = getFunctions(firebaseApp);
                connectFunctionsEmulator(functions, 'localhost', 5001);

                // Existing emulator connections

                await FirebaseAuthentication.useEmulator({
                    host: 'localhost',
                    port: 9099
                });
                await FirebaseFirestore.useEmulator({
                    host: 'localhost',
                    port: 8080
                });
            }

            await FirebaseAuthentication.setPersistence({
                persistence: Persistence.BrowserLocal
            });
        }
    } catch (error) {
        throw new Error(`Firebase initialization failed: ${error}`);
    }
};

export const handleGoogleSignIn = async (
    callback: (success: boolean) => void
) => {
    try {
        // Sign in with Google using Capacitor plugin
        const result = await FirebaseAuthentication.signInWithGoogle();
        if (!result.user) {
            throw new Error('No user data received');
        }

        const user = result.user;
        console.log('Google User', user);
        // Create an object with user data
        const userData: User = {
            ...DEFAULT_USER,
            ID: user.uid,
            username: (user.displayName ?? '').replace(/\s/g, ''),
            displayName: (user.displayName ?? '').replace(/\s/g, ''),
            email: (user.email ?? '').replace(/\s/g, ''),
            isAdmin: false,
            isVerified: true,
            createdAt: serverTimestamp() as Timestamp,
            modifiedAt: serverTimestamp() as Timestamp
        };

        // Check if user exists in Firestore
        const { snapshot } = await FirebaseFirestore.getDocument<User>({
            reference: `Users/${user.uid}`
        });

        const userDoc = snapshot.data;

        // If user doesn't exist, create new document
        if (!userDoc) {
            await FirebaseFirestore.setDocument({
                reference: `Users/${user.uid}`,
                data: userData,
                merge: true
            });
        }

        callback(true);
        return;
    } catch (error: any) {
        console.error('Google Sign-In Error:', error.message);
        callback(false);
    }
};

export const handleAppleSignIn = async (
    callback: (success: boolean) => void
) => {
    try {
        const result = await FirebaseAuthentication.signInWithApple();
        if (!result.user) {
            throw new Error('No user data received');
        }

        const user = result.user;
        console.log('Apple User', result);

        // Create an object with user data
        const userData: User = {
            ...DEFAULT_USER,
            ID: user.uid,
            username: (user.displayName ?? '').replace(/\s/g, ''),
            displayName: (user.displayName ?? '').replace(/\s/g, ''),
            email: (user.email ?? '').replace(/\s/g, ''),
            isAdmin: false,
            isVerified: true,
            profileImage: user.photoUrl ?? '',
            createdAt: serverTimestamp() as Timestamp,
            modifiedAt: serverTimestamp() as Timestamp
        };

        // Check if user exists in Firestore
        const { snapshot } = await FirebaseFirestore.getDocument<User>({
            reference: `Users/${user.uid}`
        });

        const userDoc = snapshot.data;

        // If user doesn't exist, create new document
        if (!userDoc) {
            await FirebaseFirestore.setDocument({
                reference: `Users/${user.uid}`,
                data: userData,
                merge: true
            });
        }

        callback(true);
        return;
    } catch (error: any) {
        console.error('Apple Sign-In Error:', error.message);
        callback(false);
    }
};
