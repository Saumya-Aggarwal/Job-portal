import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

/**
 * A flexible route protection component that handles different authentication scenarios
 * 
 * @param {Object} props
 * @param {string[]} [props.allowedRoles] - Roles that can access this route
 * @param {boolean} [props.authenticationRequired=true] - Whether authentication is required
 * @param {boolean} [props.guestOnly=false] - Whether the route is only for non-authenticated users
 * @param {string} [props.redirectTo="/"] - Where to redirect if access is denied
 */
const ProtectedRoute = ({
  allowedRoles,
  authenticationRequired = true,
  guestOnly = false,
  redirectTo = "/",
  children
}) => {
  const { user } = useSelector((state) => state.auth);
  
  // Case 1: Loading state
  if (user === undefined) {
    return <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>;
  }
  
  // Case 2: Guest-only routes (login/signup)
  if (guestOnly) {
    return user ? <Navigate to={redirectTo} replace /> : children || <Outlet />;
  }
  
  // Case 3: Authentication required but user not logged in
  if (authenticationRequired && !user) {
    return <Navigate to="/login" replace />;
  }
  
  // Case 4: Role-based access control
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to={redirectTo} replace />;
  }
  
  // All checks passed, render the protected content
  return children || <Outlet />;
};

export default ProtectedRoute;