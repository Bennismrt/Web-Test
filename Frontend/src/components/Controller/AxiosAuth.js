import { ControllerInterceptor } from "./ControllerInterceptors";
import { useEffect } from "react";
import useRefreshToken from "./RefreshToken";
import useAuth from "./UseAuth";

const AxiosAuth = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        const requestIntercept = ControllerInterceptor.interceptors.request.use(
            config => {
                const token = auth?.accessToken;
                if(!config.headers.Authorization){
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = ControllerInterceptor.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers.Authorization= `Bearer ${newAccessToken}`;
                    return ControllerInterceptor(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            ControllerInterceptor.interceptors.request.eject(requestIntercept);
            ControllerInterceptor.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return ControllerInterceptor;
}

export default AxiosAuth;