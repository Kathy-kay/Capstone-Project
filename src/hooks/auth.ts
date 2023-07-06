import { useContext } from "react";
import { AuthContext, AuthContextType } from "../context/AuthProvider";

export const useAuth = (): AuthContextType => {
    const authContext = useContext(AuthContext);

    if(!authContext){
        throw new Error("useAuth must be use within an auth provider");
    }
    return authContext;
}

