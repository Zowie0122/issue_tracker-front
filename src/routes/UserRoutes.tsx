import { Outlet, Navigate } from "react-router-dom";
import { useGetSelfQuery } from "../services/usersApi";

const UserRoutes = () => {
  const { data, isLoading, isSuccess } = useGetSelfQuery({});
  console.log(data, isLoading, isSuccess);
  let content;
  if (isLoading) {
    content = <p>Loading</p>;
  } else if (isSuccess) {
    content = <Outlet />;
  } else {
    content = <Navigate to="/login" />;
  }
  return content;
};

export default UserRoutes;
