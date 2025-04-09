import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({
  children,
  redirectTo = "/admin/login",
  allowedRole = "admin",
}) => {
  const { user, isUserChecked } = useSelector((state) => state.auth);
  // Check if user is fetched
  if (!isUserChecked) {
    return null; // or a loading spinner
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }
  // console.log("user", user);

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? children : <Outlet />;
};
ProtectedRoute.propTypes = {
  redirectTo: PropTypes.string,
  allowedRole: PropTypes.string,
  children: PropTypes.node,
};

export default ProtectedRoute;
