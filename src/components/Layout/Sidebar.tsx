import { useState, useEffect } from 'react';
import { Drawer, Toolbar } from '@mui/material';

import IconList from '../Lists/IconList';

import { useGetSelfQuery } from '../../services/usersApi';

import { PERMISSIONS } from '../../utils/constants';

const drawerWidth = 240;

interface PropsI {
  isMobile: boolean;
}

const defaultItems = [
  { title: 'Received Issue', icon: 'received', link: '/issues/received' },
  { title: 'Posted Issue', icon: 'sent', link: '/issues/issued' },
  { title: 'All issues', icon: 'all', link: '/issues/all' },
];

const adminItems = [
  { title: 'Users', icon: 'users', link: '/admin/users' },
  {
    title: 'Departments',
    icon: 'department',
    link: '/admin/departments',
  },
];

const Sidebar = ({ isMobile }: PropsI) => {
  const { data: user, isLoading: loadingUser } = useGetSelfQuery({});
  const [items, setItems] = useState(defaultItems);

  useEffect(() => {
    if (!loadingUser && user && user.role_id === PERMISSIONS.admin.value) {
      setItems([...defaultItems, ...adminItems]);
    }
  }, [loadingUser]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        height: '100%',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          height: '100%',
        },
      }}
      anchor="left"
    >
      <Toolbar />
      <IconList items={items} />
    </Drawer>
  );
};

export default Sidebar;
