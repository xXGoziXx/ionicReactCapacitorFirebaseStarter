import { AuthStateChange, FirebaseAuthentication } from "@capacitor-firebase/authentication";
import { useEffect } from "react";

/**
 * Custom hook to handle Firebase authentication state
 * @returns Current authenticated user or null
 */
export const useAuthStateChangedEffect = (callback: (result: AuthStateChange | null) => void) => {
    useEffect(() => {
        let unsubscribe: (() => Promise<void>) | undefined;

        FirebaseAuthentication.addListener("authStateChange", (event) => {
            callback(event);
        }).then(handle => {
            unsubscribe = () => handle.remove();
        });

        return () => {
            if (unsubscribe) {
                void unsubscribe();
            }
        };
    }, [callback]);
};
