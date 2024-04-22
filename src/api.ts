import axios from "axios";

export const api = () =>
    axios.create({
        baseURL: import.meta.env.REAL_TIME_DATABSE_API,
    });

export default api;
