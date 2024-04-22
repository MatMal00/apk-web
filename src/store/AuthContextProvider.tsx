import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase.config";
import { GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth";

export type TAuthContextState = {
    isLoggedIn: boolean;
    isEmailUser: boolean;
    isGoogleUser: boolean;
    currentUser: User | null;
    loading: boolean;
    setCurrentUser: (user: User | null) => void;
};

export const AuthContext = createContext<TAuthContextState>({} as TAuthContextState);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isEmailUser, setIsEmailUser] = useState(false);
    const [isGoogleUser, setIsGoogleUser] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, []);

    const initializeUser = async (user: User | null) => {
        if (user) {
            setCurrentUser({ ...user });

            const isEmail = user.providerData.some((provider) => provider.providerId === "password");
            setIsEmailUser(isEmail);

            const isGoogle = user.providerData.some(
                (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
            );
            setIsGoogleUser(isGoogle);

            setIsLoggedIn(true);
        } else {
            setCurrentUser(null);
            setIsLoggedIn(false);
        }

        setLoading(false);
    };

    const value: TAuthContextState = {
        isLoggedIn,
        isEmailUser,
        isGoogleUser,
        currentUser,
        setCurrentUser,
        loading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
