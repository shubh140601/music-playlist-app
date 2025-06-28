import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../redux/store";

const HomeRedirect = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  // if user is logged in than redirect to homepage else redirect to login page
  return user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

export default HomeRedirect;
