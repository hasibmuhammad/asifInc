import { Navigate, useLocation } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import Loader from "../components/Loader";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useAuthContext();
  const location = useLocation();

  if (loading) return <Loader />;

  if (!user)
    return <Navigate state={location.pathname} to={"/signin"} replace />;

  return children;
};

export default PrivateRoute;
