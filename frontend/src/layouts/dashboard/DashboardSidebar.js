import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Divider, Drawer, Stack, Typography } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components 
import NavSection from '../../components/NavSection';
import navConfig from './NavConfig';
import { margin } from '@mui/system';
// import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

// const DRAWER_WIDTH = 30;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: 156,
  },
  zIndex: 1,


}))

//------------------------------------------


export default function DashboardSidebar() {
  const { pathname } = useLocation()
  // const { user } = useSelector((state) => state.auth)
  const isDesktop = useResponsive('up', 'lg', "only")
  // console.log('mediaBetween', isDesktop)

  // useEffect(() => {
  //   if (isOpenSidebar) {
  //     onCloseSidebar();
  //   }
  // }, [pathname]);

  const renderContent = (
    <Box
    // sx={{ bgcolor: "rgb(250, 250, 251)" }}
    >
      <NavSection navConfig={navConfig} />
    </Box>
  );

  return (
    <Stack spacing={2}
      // sx={{
      //   display: { xs: "none", sm: "none", md: "block", lg: "block" },
      //   position: 'sticky',
      //   overflow: "hidden",
      //   height: "100vh",
      //   // bgcolor: 'red'
      // }}
      sx={{
        position: 'sticky',
        top: '84px',
        maxHeight: 'calc(100vh - 84px)',
        overflowY: 'auto'
      }}
    >
      {renderContent}
    </Stack>
  );
}
