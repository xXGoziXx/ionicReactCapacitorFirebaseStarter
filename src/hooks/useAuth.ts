import { useState, useEffect } from "react";
import { FirebaseAuthentication, User } from "@capacitor-firebase/authentication";

/**
 * Custom hook to handle Firebase authentication state
 * @returns Current authenticated user or null
 */
export const useAuth = (): User | null => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let unsubscribe: (() => Promise<void>) | undefined;

    FirebaseAuthentication.addListener("authStateChange", (event) => {
      setUser(event.user || null);
    }).then(handle => {
      unsubscribe = () => handle.remove();
    });

    return () => {
      if (unsubscribe) {
        void unsubscribe();
      }
    };
  }, []);

  return user;
};
