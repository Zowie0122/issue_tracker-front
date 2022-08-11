import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { GetApp, Send, AllInbox, Group, Business, Settings } from '@mui/icons-material';

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
  items: {
    title: string;
    icon: string;
    link: string;
  }[];
}

const IconList = ({ items = [] }: IconListProps) => {
  return (
    <>
      <List>
        {items.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component="a" href={item.link}>
              <ListItemIcon>{icons[item.icon]}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default IconList;
