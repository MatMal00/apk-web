import { createContext, useState, useEffect, useCallback } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth";
import { child, get, getDatabase, ref } from "firebase/database";
import { mapToCommonUserModel } from "src/utils";
import { TCommonUser } from "src/types/auth";
import toast from "react-hot-toast";

export type TAuthContextState = {
    isLoggedIn: boolean;
    currentUser: TCommonUser | null;
    isInitializing: boolean;
    setCurrentUser: (user: TCommonUser | null) => void;
};

export const AuthContext = createContext<TAuthContextState>({} as TAuthContextState);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<TCommonUser | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isInitializing, setIsInitializing] = useState(true);

    const retriveUserFromDb = (user: User) => {
        const dbRef = ref(getDatabase());

        get(child(dbRef, `users/${user.uid}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setCurrentUser(snapshot.val());
                } else {
                    setCurrentUser(mapToCommonUserModel(user));
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error("Something went wrong during authentication process");
            });
    };

    const initializeUser = useCallback((user: User | null) => {
        if (user) {
            retriveUserFromDb(user);
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

    return <AuthContext.Provider value={state}>{isInitializing ? null : children}</AuthContext.Provider>;
};
