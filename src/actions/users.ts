import { TCommonUser } from "src/types";
import { fetcher } from "./fetcher";
import { mapToCommonResponseModel } from "src/utils";

export const fetchUsersAction = async (url: string): Promise<TCommonUser[]> => {
    try {
        const response = await fetcher<{ [key: string]: TCommonUser }>(url);
        const users = mapToCommonResponseModel<TCommonUser>(response);
        return users;
    } catch (error) {
        console.error({ error });
        return [];
    }
};
