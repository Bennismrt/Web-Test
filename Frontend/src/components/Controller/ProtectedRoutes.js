import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from '../Controller/UseAuth';


const ProtectedRoutes = () => {
  const {auth} = useAuth();
  const location = useLocation();
  return auth?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to={{pathname:'/'}} replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;