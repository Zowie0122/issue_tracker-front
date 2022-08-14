import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useGetSelfQuery } from '../services/usersApi';

import Spinner from '../components/Spinner';

const UserRoutes = () => {
  const { isSuccess, isError } = useGetSelfQuery({});
  const [content, setContent] = useState(<Spinner />);

  useEffect(() => {
    if (isSuccess) setContent(<Outlet />);
    if (isError) setContent(<Navigate to="/login" />);
  }, [isSuccess, isError]);

  return content;
};

export default UserRoutes;
