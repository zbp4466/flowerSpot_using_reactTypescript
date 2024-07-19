import React, { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks/hook";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({ children }) => {
  const userDetails = useAppSelector((state) => state.user.userDetails);

  if (!userDetails) {
    toast.error("Please register yourself to access other pages");
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default ProtectedRoutes;
