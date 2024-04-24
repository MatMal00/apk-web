import { child, get, getDatabase, ref } from "firebase/database";

export const fetcher = async <T>(url: string): Promise<T> => {
    const dbRef = ref(getDatabase());
    const response = await get(child(dbRef, url));

    if (!response.exists()) throw response;
    return response.val();
};
