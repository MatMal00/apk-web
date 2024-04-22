import { FC } from "react";
import { Outlet } from "react-router-dom";

interface IDefaultLayoutProps {}

export const DefaultLayout: FC<IDefaultLayoutProps> = () => {
    return (
        <>
            <Outlet />
        </>
    );
};
