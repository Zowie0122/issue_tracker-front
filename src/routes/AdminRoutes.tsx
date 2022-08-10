import { Outlet, Navigate } from "react-router-dom";
import { useGetSelfQuery } from "../services/usersApi";
import { PERMISSIONS } from "../utils/constants";

const AdminRoutes = () => {
  const { data, isLoading, isSuccess } = useGetSelfQuery({});
  let content;
  if (isLoading) {
    // TODO: make a loading page
    content = <p>Loading</p>;
  } else if (isSuccess && data.role_id === PERMISSIONS.admin.value) {
    content = <Outlet />;
  } else if (isSuccess && data.role_id === PERMISSIONS.user.value) {
    content = <Navigate to="/issues/received" />;
  } else {
    content = <Navigate to="/login" />;
  }
  return content;
};

export default AdminRoutes;
