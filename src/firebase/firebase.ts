// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDAEBEf81VD-Mp7WhE6LG3ho6lXod0dBAw",
    authDomain: "apk-web-brzegowy.firebaseapp.com",
    projectId: "apk-web-brzegowy",
    storageBucket: "apk-web-brzegowy.appspot.com",
    messagingSenderId: "783010955517",
    appId: "1:783010955517:web:2a6ac77b418d0adba17e94",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
