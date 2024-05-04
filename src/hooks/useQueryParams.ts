import { URLSearchParamsInit, useLocation } from "react-router-dom";
import queryString from "query-string";

export const useQueryParams = () => {
    const { search } = useLocation();
    const queryParams = queryString.parse(search);

    const getUpdatedQueries = (key: string, value: string) => {
        const newParams = { ...queryParams };

        if (value) {
            newParams[key] = value;
        } else if (newParams[key]) {
            delete newParams[key];
        }

        return newParams as URLSearchParamsInit;
    };

    return { allSearchParams: queryParams, getUpdatedQueries };
};
