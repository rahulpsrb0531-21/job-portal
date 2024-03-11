import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack, Divider } from '@mui/material';
// mock
// import account from '../../_mock/account';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import NavSection from './adminNavSection';
//
import navConfig from './NavConfig';
import Scrollbar from '../../components/Scrollbar';

// ----------------------------------------------------------------------

// const DRAWER_WIDTH = 156;

const RootStyle = styled('div')(({ theme }) => ({
  // [theme.breakpoints.up('lg')]: {
  //   flexShrink: 0,
  //   width: 106,
  // },
  width: 106,
  zIndex: 1,


}))

export default function AdminSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation()
  // console.log('pathname', pathname)

  const isDesktop = useResponsive('up', 'lg')

  // useEffect(() => {
  //   if (isOpenSidebar) {
  //     onCloseSidebar();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pathname]);

  const renderContent = (
    <NavSection navConfig={navConfig} />
  );

  const notificationTop = '240px'
  const notificationMaxHeight = 'calc(100vh - 240px)'
  return (
    <Stack
      sx={{
        position: 'sticky',
        top: pathname === "/admin/notification" ? notificationTop : '84px',
        // top: 1000,
        // maxHeight: 'calc(100vh - 240px)',
        maxHeight: (pathname === "/admin/notification") ? notificationMaxHeight : 'calc(100vh - 84px)',
        overflowY: 'auto',
        // bgcolor: "red",
        // width: '10%',
        // textAlign: 'center'
      }}
    >
      {renderContent}
    </Stack>
  );
}
