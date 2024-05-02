import SWR from "swr";
import { TCommonUser } from "src/types/auth";
import { fetchUsersAction } from "src/actions/users";

export const useFetchUsers = () => {
    const { data, error, isLoading } = SWR<TCommonUser[], string>("/users", fetchUsersAction);
    return { data, error, isLoading };
};
