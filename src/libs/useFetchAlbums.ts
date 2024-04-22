import SWR from "swr";
import { fetcher } from "src/actions";
import { IAlbum } from "src/types";

export const useFetchAlbums = () => {
    const { data, error, isLoading } = SWR<IAlbum[], string>("/albums", fetcher);
    return { data, error, isLoading };
};
