import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { GetApp, Send, AllInbox, Group, Business, Settings } from '@mui/icons-material';
import { SxProps } from '@mui/system';

const icons: {
  [key: string]: JSX.Element;
} = {
  received: <GetApp />,
  sent: <Send />,
  all: <AllInbox />,
  users: <Group />,
  department: <Business />,
  setting: <Settings />,
};

export interface IconListProps {
  sx: SxProps;
  items: {
    title: string;
    icon: string;
    link?: string;
    onClick?: () => void | undefined;
  }[];
}

const IconList = ({ sx, items = [] }: IconListProps) => {
  return (
    <>
      <List sx={{ ...sx }}>
        {items.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component="a" href={item.link} onClick={item.onClick}>
              <ListItemIcon sx={{ color: 'inherit' }}>{icons[item.icon]}</ListItemIcon>
              <ListItemText primary={item.title} sx={{ '&:hover': { scale: '1.1' } }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default IconList;
