import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// import { useJwt } from 'react-jwt';
// material
import { styled } from '@mui/material/styles';
//
// import DashboardNavbar from './DashboardNavbar';
// import DashboardSidebar from './DashboardSidebar';
import AdminSidebar from './adminSidebar'
import Header from '../../components/header';
import AdminNavbar from './adminNavBar';
import Footer from '../../components/footer';
import CssBaseline from '../../theme/overrides/CssBaseline';
import { Box, Container, Stack } from '@mui/material';
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
        paddingTop: APP_BAR_DESKTOP + 24,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
    const [open, setOpen] = useState(false);

    // const { decodedToken, isExpired } = useJwt(sessionStorage.getItem("access"));
    // const navigate = useNavigate();
    // if (isExpired) {
    //     navigate("/")
    // }

    return (
        <Stack
        // maxWidth='lg'
        // sx={{ bgcolor: "red" }}
        // sx={{
        //     "& .MuiBox-root": {
        //         height: 'auto', overflow: 'hidden',
        //     },
        //     // bgcolor: 'rgb(250, 250, 251)'
        // }}
        // direction={'row'}
        >
            {/* <CssBaseline /> */}
            {/* <Container maxWidth='lg' > */}
            <Header />
            <Stack direction={'row'} >
                <AdminSidebar />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        bgcolor: 'background.default',
                        p: 0,
                        paddingTop: '64px'
                    }}
                >
                    <Container maxWidth="lg">
                        <Outlet />
                    </Container>
                    <Box sx={{ pb: 2 }} />
                </Box>
            </Stack>
            <Footer />
        </Stack>
    );
}

// <RootStyle>
//     <Header />
//     <AdminSidebar />
//     <MainStyle>
//         <Outlet />
//     </MainStyle>
// </RootStyle>