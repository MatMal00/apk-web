import axios from "axios";

export const api = () =>
    axios.create({
        baseURL: import.meta.env.VITE_JSON_PLACEHOLDER_API,
    });

export default api;
