import { Outlet, Navigate } from "react-router-dom";
import { useGetSelfQuery } from "../services/usersApi";
import { PERMISSIONS } from "../utils/constants";

const AdminRoutes = () => {
  const { data, isLoading, isSuccess, isError } = useGetSelfQuery({});
  console.log(data, isLoading, isSuccess);
  let content;
  if (isLoading) {
    content = <p>Loading</p>;
  } else if (isSuccess && data.role_id === PERMISSIONS.admin) {
    content = <Outlet />;
  } else if (isSuccess && data.role_id === PERMISSIONS.user) {
    content = <Navigate to="/issues/received" />;
  } else {
    content = <Navigate to="/login" />;
  }
  return content;
};

export default AdminRoutes;
