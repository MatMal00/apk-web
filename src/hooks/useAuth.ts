import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "src/constants";
import { AuthContext, TAuthContextState } from "src/store";

export const useAuth = (): TAuthContextState => useContext(AuthContext);

export const useNavigateOnLoggedIn = (isLoggedIn: boolean) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) navigate(ROUTE.HOME, { replace: true });
    }, [isLoggedIn, navigate]);
};
