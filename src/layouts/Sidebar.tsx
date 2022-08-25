import { useState, useMemo } from 'react';
import { Drawer, Box, Avatar, Typography } from '@mui/material';

import { SxProps } from '@mui/system';

import IconList from '../components/Lists/IconList';

import { useGetSelfQuery } from '../services/usersApi';
import { PERMISSIONS } from '../utils/constants';

const drawerWidth = 240;

interface PropsI {
  sx?: SxProps;
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

const Sidebar = ({ sx }: PropsI) => {
  const { data: user, isLoading: loadingUser } = useGetSelfQuery({});
  const [items, setItems] = useState(defaultItems);

  useMemo(() => {
    if (!loadingUser && user && user.roleId === PERMISSIONS.admin.value) {
      setItems([...defaultItems, ...adminItems]);
    }
  }, [loadingUser]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        transitionDuration: '20',
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          height: '100%',
          backgroundColor: 'primary.main',
          borderTopRightRadius: '20px',
          borderBottomRightRadius: '20px',
          color: 'white',
        },
        ...sx,
      }}
      anchor="left"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '3rem',
        }}
      >
        <Avatar sx={{ width: 56, height: 56 }} src="../../public/avatar_default.png" />
        {user && (
          <Typography variant="body2" component="div" sx={{ marginTop: '1rem' }}>
            {user.firstName + ' ' + user.lastName}
          </Typography>
        )}
        <IconList items={items} sx={{ marginTop: '2rem' }} />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
