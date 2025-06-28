import { Navigate } from "react-router-dom";
import type { JSX } from "@emotion/react/jsx-runtime";
import type { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = useSelector((state: RootState) => state.auth.token);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
