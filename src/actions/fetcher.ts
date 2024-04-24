import { child, get, getDatabase, ref } from "firebase/database";
import toast from "react-hot-toast";
import { apiErrorHandler } from "src/helpers";

export const fetcher = async <T>(url: string): Promise<T> => {
    try {
        const dbRef = ref(getDatabase());
        const response = await get(child(dbRef, url));

        if (!response.exists()) throw response;
        return response.val();
    } catch (error) {
        const errorMessage = apiErrorHandler(error);
        toast.error(errorMessage);
        throw apiErrorHandler(error);
    }
};
