import { Outlet, Navigate } from 'react-router-dom';
import { useGetSelfQuery } from '../services/usersApi';
import Spinner from '../components/Spinner';
import { useEffect, useState } from 'react';

const UserRoutes = () => {
  const { isLoading, isSuccess, isError } = useGetSelfQuery({});
  const [content, setContent] = useState(<Spinner />);
  console.log('in the user route');
  console.log('user route,isSucess', isSuccess);
  console.log('user route, isLoading', isLoading);
  console.log('user route, isLoading', isError);

  useEffect(() => {
    if (isSuccess) setContent(<Outlet />);
    if (isError) setContent(<Navigate to="/login" />);
  }, [isSuccess, isError]);

  return content;
};

export default UserRoutes;
