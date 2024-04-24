import { child, push, ref, remove, update } from "firebase/database";
import { database } from "src/firebase";

export const postRequest = async (url: string, data: object) => {
    const response = await push(ref(database, url), data);
    return response.key;
};

export const deleteRequest = async (url: string) => {
    const dbRef = ref(database, url);
    remove(dbRef);
};

export const updateRequest = async (url: string, data: object) => {
    const newPostKey = push(child(ref(database), url)).key;
    return await update(ref(database), { [`${url}/` + newPostKey]: data });
};
