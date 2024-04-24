import { push, ref } from "firebase/database";
import { database } from "src/firebase";
import { httpStatus } from "src/helpers";
import api from "src/api";

export const postRequest = async (url: string, data: object) => {
    const response = await push(ref(database, url), data);
    return response.key;
};

export const deleteRequest = async <T>(url: string) => {
    const response = await api().delete<T>(url);

    const status = httpStatus(response.status);
    if (status !== "success") throw response;

    return response.data;
};

export const updateRequest = async <T>(url: string, data: object) => {
    const response = await api().patch<T>(url, { data });

    const status = httpStatus(response.status);
    if (status !== "success") throw response;

    return response.data;
};
