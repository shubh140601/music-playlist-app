import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../redux/store";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useSelector((state: RootState) => state.auth.token);

  if (token) {
    // user is logged in, redirect to dashboard - if user enters login/register in url
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

export default PublicRoute;
