import { Outlet, Navigate } from "react-router-dom";

const AdminRoutes = () => {
  // TODO: add auth guard for guests and users(user + admin)
  const isAdmin = true;
  const isUser = true;
  return isAdmin ? <Outlet /> : <Navigate to={isUser ? "/" : "/login"} />;
};

export default AdminRoutes;
