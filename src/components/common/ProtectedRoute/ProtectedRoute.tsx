import { FC, useEffect } from "react";
import toast from "react-hot-toast";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { ROUTE } from "src/constants";
import { useAuth } from "src/hooks";

interface IProtectedRouteProps {}

export const ProtectedRoute: FC<IProtectedRouteProps> = () => {
    const location = useLocation();
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) return <Navigate to={ROUTE.LOGIN} state={{ from: location }} replace />;

    return <Outlet />;
};

interface IProtectedProjectRouteProps {}

export const ProtectedProjectRoute: FC<IProtectedProjectRouteProps> = () => {
    const location = useLocation();
    const { currentUser } = useAuth();
    const { projectUid = "" } = useParams<{ projectUid: string }>();

    const userProjects = currentUser?.projects;
    const userNotAllowedForThisProject = !userProjects || !userProjects.includes(projectUid);

    useEffect(() => {
        if (userNotAllowedForThisProject) toast.error("You are not allowed to watch this project");
    }, [userNotAllowedForThisProject]);

    if (userNotAllowedForThisProject) {
        return <Navigate to={ROUTE.HOME} state={{ from: location }} replace />;
    }

    return <Outlet />;
};
