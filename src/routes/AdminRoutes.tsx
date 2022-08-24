import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useGetSelfQuery } from '../services/usersApi';

import Spinner from '../components/Spinner';
import { PERMISSIONS } from '../utils/constants';

const AdminRoutes = () => {
  const { data: user, isSuccess, isError } = useGetSelfQuery({});
  const [content, setContent] = useState(<Spinner />);

  useEffect(() => {
    if (isSuccess && user.role_id === PERMISSIONS.admin.value) setContent(<Outlet />);
    if (isSuccess && user.role_id !== PERMISSIONS.admin.value) setContent(<Navigate to="/issues/received" />);
    if (isError) setContent(<Navigate to="/login" />);
  }, [isSuccess, isError]);

  return content;
};

export default AdminRoutes;
