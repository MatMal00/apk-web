import { useContext } from "react";
import { AuthContext, TAuthContextState } from "src/store";

export const useAuth = (): TAuthContextState => useContext(AuthContext);
