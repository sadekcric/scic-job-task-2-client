import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loader } = useContext(AuthContext);
  const location = useLocation();

  if (loader) {
    return;
  }

  if (user) {
    return <>{children}</>;
  }
  return <Navigate state={location.pathname} to="/"></Navigate>;
};

export default PrivateRoute;
