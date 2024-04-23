import { ref, set } from "firebase/database";
import { auth, database } from "./firebase.config";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    getAdditionalUserInfo,
} from "firebase/auth";
import { mapToCommonUserModel } from "src/utils";

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const user = response.user;
    const additionaluserInfo = getAdditionalUserInfo(response);

    if (additionaluserInfo?.isNewUser) {
        set(ref(database, "users/" + user.uid), mapToCommonUserModel(user));
    }

    return response;
};
export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const response = await signInWithPopup(auth, provider);

    const user = response.user;
    const additionaluserInfo = getAdditionalUserInfo(response);

    if (additionaluserInfo?.isNewUser) {
        set(ref(database, "users/" + user.uid), mapToCommonUserModel(user));
    }

    return user;
};

export const doSignInWithEmailAndPassword = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const doSignOut = async () => {
    return auth.signOut();
};

// export const doPasswordReset = async (email: string) => {
//     return sendPasswordResetEmail(auth, email);
// };

// export const doPasswordChange = async (password: string) => {
//     if (auth.currentUser) {
//         return updatePassword(auth.currentUser, password);
//     } else {
//         // Handle case where there is no current user logged in (throw error or display message)
//         throw new Error("No user logged in");
//     }
// };

// export const doSendEmailVerification = async () => {
//     if (auth.currentUser) {
//         return sendEmailVerification(auth.currentUser, {
//             url: `${window.location.origin}/`,
//         });
//     } else {
//         // Handle case where there is no current user logged in (throw error or display message)
//         throw new Error("No user logged in");
//     }
// };
