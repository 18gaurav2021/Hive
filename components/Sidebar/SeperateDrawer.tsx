'use client';
import React, { useState } from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { DrawerHeader } from '../Sidebar/Sidebarheader';
import { Drawer } from '../Sidebar/Sidebarheader';

import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
//  import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ScaleIcon from '@mui/icons-material/Scale';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import { useRouter } from 'next/navigation';
import PersonPinCircleOutlinedIcon from '@mui/icons-material/PersonPinCircleOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

interface SeperateDrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
  theme: any;
}

export default function SeperateDrawer({
  open,
  handleDrawerClose,
  theme,
}: SeperateDrawerProps) {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };
  const sidebarData = [
    {
      icon: <CottageOutlinedIcon />,
      text: 'Dashboard',
      path: '/dashboard',
    },
    {
      icon: <AssignmentIndOutlinedIcon />,
      text: 'Request',
    },
    {
      icon: <MonetizationOnOutlinedIcon />,
      text: 'Order',
      path: '/warehouse',
    },
    {
      icon: <BadgeOutlinedIcon />,
      text: 'Inventory',
      path: '/vendor',
    },
    {
      icon: <ShoppingCartOutlinedIcon />,
      text: 'Asset',
    },
    {
      icon: <FormatListBulletedOutlinedIcon />,
      text: 'Finance',
    },
    {
      icon: <PersonPinCircleOutlinedIcon />,
      text: 'Help Centre',
      path: '/outlet',
    },
    {
      icon: <MenuOutlinedIcon />,
      text: 'Configuration',
      path: '/tabscomponent',
    },
    // {
    //   icon: <PersonPinCircleOutlinedIcon />,
    //   text: 'Employee Management',
    //   path: '/employee',
    // },
    // {
    //   icon: <MarkEmailUnreadOutlinedIcon />,
    //   text: 'MarkEmail',
    // },
    // {
    //   icon: <LocationOnOutlinedIcon />,
    //   text: 'Location',
    // },
    // {
    //   icon: <ScaleIcon />,
    //   text: 'Scale',
    // },
    // {
    //   icon: <LibraryBooksOutlinedIcon />,
    //   text: 'LibraryBooks',
    // },
  ];

  const [menuActive, setMenuActive] = useState('');

  return (
    <>
      <Drawer className="sidebar" variant="permanent" open={open} theme={theme}>
        <DrawerHeader />
        <Divider />
        <List className="List-menu-sidebar">
          {sidebarData.map((data, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: '10.5px',
                }}
                disableRipple
                onClick={() => data.path && handleNavigation(data.path)}
              >
                <ListItemIcon
                  onClick={() => setMenuActive(data.text)}
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: menuActive === data.text ? 'red' : 'gray',
                  }}
                >
                  {data.icon}
                </ListItemIcon>
                <ListItemText
                  primary={data.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
