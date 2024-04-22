import { auth } from "./firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    updatePassword,
    signInWithPopup,
    GoogleAuthProvider,
    User,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user: User | null = result.user; // User can be null

    // add user to firestore (check for null user before accessing properties)
    if (user) {
        // ... your logic using user object
    }
};

export const doSignUpWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user: User | null = result.user; // User can be null

    // add user to firestore (check for null user before accessing properties)
    if (user) {
        // ... your logic using user object
    }
};

export const doSignOut = async () => {
    return auth.signOut();
};

export const doPasswordReset = async (email: string) => {
    return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = async (password: string) => {
    if (auth.currentUser) {
        return updatePassword(auth.currentUser, password);
    } else {
        // Handle case where there is no current user logged in (throw error or display message)
        throw new Error("No user logged in");
    }
};

export const doSendEmailVerification = async () => {
    if (auth.currentUser) {
        return sendEmailVerification(auth.currentUser, {
            url: `${window.location.origin}/`,
        });
    } else {
        // Handle case where there is no current user logged in (throw error or display message)
        throw new Error("No user logged in");
    }
};
