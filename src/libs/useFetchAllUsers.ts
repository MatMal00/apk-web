import SWR from "swr";
import { fetcher } from "src/actions";
import { IUser } from "src/types";

export const useFetchAllUsers = () => {
    const { data, error, isLoading } = SWR<IUser[], string>(`/users`, fetcher);
    return { data, error, isLoading };
};
