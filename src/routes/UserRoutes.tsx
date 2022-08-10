import { Outlet, Navigate } from "react-router-dom";
import { useGetSelfQuery } from "../services/usersApi";

const UserRoutes = () => {
  const { isLoading, isSuccess } = useGetSelfQuery({});
  let content;
  if (isLoading) {
    // TODO: make a loading page
    content = <p>Loading</p>;
  } else if (isSuccess) {
    content = <Outlet />;
  } else {
    content = <Navigate to="/login" />;
  }
  return content;
};

export default UserRoutes;
