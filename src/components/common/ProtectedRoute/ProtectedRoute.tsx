import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTE } from "src/constants";
import { useAuth } from "src/hooks";

interface IProtectedRouteProps {}

export const ProtectedRoute: FC<IProtectedRouteProps> = () => {
    const location = useLocation();
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) return <Navigate to={ROUTE.LOGIN} state={{ from: location }} replace />;

    return <Outlet />;
};
