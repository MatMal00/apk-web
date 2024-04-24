import SWR from "swr";
import { fetcher } from "src/actions";
import { TCommonUser } from "src/types/auth";

export const useFetchUsers = () => {
    const { data, error, isLoading } = SWR<TCommonUser[], string>("/users", fetcher);
    return { data, error, isLoading };
};
