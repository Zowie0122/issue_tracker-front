import { Outlet, Navigate } from "react-router-dom";

const UserRoutes = () => {
  // TODO: add auth guard for guests and users(user + admin)
  const authentificated = true;
  return authentificated ? <Outlet /> : <Navigate to="/login" />;
};

export default UserRoutes;
