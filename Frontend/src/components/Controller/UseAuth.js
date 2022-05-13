import { useContext, useDebugValue } from "react";
import AuthContext from "./AuthContext";

const UserAuth = () => {
    const { auth } = useContext(AuthContext);
    return useContext(AuthContext);
}

export default UserAuth; 