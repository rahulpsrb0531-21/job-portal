import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Divider, Drawer, Stack, Typography } from '@mui/material';
// hooks
// import useResponsive from '../../hooks/useResponsive';
// components 
import NavSection from './navSection';
import navConfig from './navConfig'
import { margin } from '@mui/system'
import useResponsive from '../../hooks/useResponsive';
// import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 140;

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('lg')]: {
        // flexShrink: 0,
        width: 196,
    },
    // marginTop: 1,
    // backgroundColor: "rgb(250, 250, 251)",
    backgroundColor: "red",
    borderRight: "0.2px solid #E1E1E1",
    zIndex: 1,


}));

// const AccountStyle = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(2, 2.5),
// }));

// ----------------------------------------------------------------------

RecruiterSidebar.propTypes = {
    isOpenSidebar: PropTypes.bool,
    onCloseSidebar: PropTypes.func,
};

export default function RecruiterSidebar({ isOpenSidebar, onCloseSidebar }) {
    const { pathname } = useLocation()
    // const { user } = useSelector((state) => state.auth)
    const isDesktop = useResponsive('up', 'lg')

    useEffect(() => {
        if (isOpenSidebar) {
            onCloseSidebar();
        }
    }, [pathname]);

    const renderContent = (
        <Box
        // sx={{ bgcolor: "red" }}
        >
            <NavSection navConfig={navConfig} />
        </Box>
    );

    return (
        <RootStyle>
            {!isDesktop && (
                <Drawer
                    open={isOpenSidebar}
                    onClose={onCloseSidebar}
                    PaperProps={{
                        sx: { width: DRAWER_WIDTH },
                    }}
                >
                    {renderContent}
                </Drawer>
            )}

            {isDesktop && (
                <Drawer
                    open
                    variant="persistent"
                    PaperProps={{
                        sx: {
                            // display: 'flex', alignItems: 'center',
                            // width: DRAWER_WIDTH,
                            // height: "80%",
                            top: "11%",
                            marginLeft: 2,
                            // paddingLeft: 5,
                            position: 'fixed',
                            border: 'none',
                            width: '12%',
                            // bgcolor: 'red'
                        },
                    }}
                >
                    {renderContent}
                </Drawer>
            )}
        </RootStyle>
    );
}
