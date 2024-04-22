import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDAEBEf81VD-Mp7WhE6LG3ho6lXod0dBAw",
    authDomain: "apk-web-brzegowy.firebaseapp.com",
    projectId: "apk-web-brzegowy",
    storageBucket: "apk-web-brzegowy.appspot.com",
    messagingSenderId: "783010955517",
    appId: "1:783010955517:web:2a6ac77b418d0adba17e94",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
