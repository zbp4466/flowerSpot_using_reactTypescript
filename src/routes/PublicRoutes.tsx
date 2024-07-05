import React, { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks/hook";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoutes: React.FC<PublicRouteProps> = ({ children }) => {
  const userDetails = useAppSelector((state) => state.user.userDetails);
  if (userDetails) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default PublicRoutes;
