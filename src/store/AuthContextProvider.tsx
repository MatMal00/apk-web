import { createContext, useState, useEffect, useCallback } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth";
import { child, get, getDatabase, ref } from "firebase/database";
import toast from "react-hot-toast";

export type TAuthContextState = {
    isLoggedIn: boolean;
    currentUser: User | null;
    isInitializing: boolean;
    setCurrentUser: (user: User | null) => void;
};

export const AuthContext = createContext<TAuthContextState>({} as TAuthContextState);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isInitializing, setIsInitializing] = useState(true);

    const retriveUserFromDb = (userId: string) => {
        const dbRef = ref(getDatabase());

        get(child(dbRef, `users/${userId}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setCurrentUser(snapshot.val());
                } else {
                    console.log("No data available");
                    toast.error("Failed to login");
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to login");
            });
    };

    const initializeUser = useCallback((user: User | null) => {
        if (user) {
            retriveUserFromDb(user.uid);
            setIsLoggedIn(true);
        } else {
            setCurrentUser(null);
            setIsLoggedIn(false);
        }

        setIsInitializing(false);
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);

        return () => {
            unsubscribe();
        };
    }, [initializeUser]);

    const state: TAuthContextState = {
        isLoggedIn,
        currentUser,
        setCurrentUser,
        isInitializing,
    };

    return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
