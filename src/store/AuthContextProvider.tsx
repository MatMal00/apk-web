import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth";

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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);

        return () => {
            unsubscribe();
        };
    }, []);

    const initializeUser = async (user: User | null) => {
        if (user) {
            setCurrentUser({ ...user });
            setIsLoggedIn(true);
        } else {
            setCurrentUser(null);
            setIsLoggedIn(false);
        }

        setIsInitializing(false);
    };

    const value: TAuthContextState = {
        isLoggedIn,
        currentUser,
        setCurrentUser,
        isInitializing,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
