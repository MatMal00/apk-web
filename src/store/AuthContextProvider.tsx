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
    updateUserData: () => void;
};

export const AuthContext = createContext<TAuthContextState>({} as TAuthContextState);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<TCommonUser | null>(null);
    const [isInitializing, setIsInitializing] = useState(true);
    const [isFetchingUser, setIsFetchingUser] = useState(true);

    const retriveUserFromDb = (user: User) => {
        const dbRef = ref(getDatabase());

        setIsFetchingUser(true);
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
            })
            .finally(() => setIsFetchingUser(false));
    };

    const initializeUser = useCallback((user: User | null) => {
        if (user) {
            retriveUserFromDb(user);
        } else {
            setCurrentUser(null);
            setIsFetchingUser(false);
        }

        setIsInitializing(false);
    }, []);

    const updateUserData = useCallback(() => {
        if (currentUser) {
            const dbRef = ref(getDatabase());
            get(child(dbRef, `users/${currentUser.uid}`))
                .then((snapshot) => {
                    if (snapshot.exists()) setCurrentUser(snapshot.val());
                })
                .catch(() => {
                    toast.error("Failed to revalidate user data");
                });
        }
    }, [currentUser]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);

        return () => {
            unsubscribe();
        };
    }, [initializeUser]);

    const state: TAuthContextState = {
        isLoggedIn: !!currentUser,
        currentUser,
        isInitializing,
        updateUserData,
    };
    console.log({ isInitializing, isFetchingUser });
    return (
        <AuthContext.Provider value={state}>{isInitializing || isFetchingUser ? null : children}</AuthContext.Provider>
    );
};
