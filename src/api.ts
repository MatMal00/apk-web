import axios from "axios";

export const api = () => {
    const instance = axios.create({
        baseURL: "https://apk-web-brzegowy-default-rtdb.europe-west1.firebasedatabase.app",
    });

    instance.interceptors.request.use(
        (config) => {
            config.url += "/data.json";
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return instance;
};

export default api;
