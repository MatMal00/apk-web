import { ReactElement } from "react";

interface ActionsHandlerProps<T> {
    isLoading: boolean;
    error?: string;
    children: (data: T) => ReactElement | ReactElement[];
    skeleton?: ReactElement;
    data?: T;
}

export const ActionsHandler = <T,>({
    isLoading,
    error,
    children,
    skeleton,
    data,
}: ActionsHandlerProps<T>): ReactElement | null => {
    if (isLoading) return <>{skeleton ? skeleton : <h1>Is loading</h1>}</>;
    if (error) return <h1>{error}</h1>;
    if (!data) return <h1>No data to display</h1>;
    if (data) return <>{children(data)}</>;
    return null;
};
