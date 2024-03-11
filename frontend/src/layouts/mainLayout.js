import React, { useState } from "react"
import { Box, Container, CssBaseline, Divider, Stack } from "@mui/material"
import { styled } from '@mui/material/styles'
import { Navigate, Outlet, useLocation } from "react-router-dom"
import Header from "../components/header"
import Footer from "../components/footer"
import DashboardSidebar from "./dashboard/DashboardSidebar"


const MainStyle = styled('div')(({ theme }) => ({
    position: "relative",
    // position: "absolute",
    // left: 120,
    // left: { xs: 0, lg: 120 },
    flexGrow: 1,
    overflow: 'hidden',
    width: "90%",
    backgroundColor: "rgb(255, 255, 255)",
    // backgroundColor: "red",
    [theme.breakpoints.up('lg')]: {
        left: 120
    },
    [theme.breakpoints.up('md')]: {
        left: 120
    },
    // paddingBottom: theme.spacing(10),
    // [theme.breakpoints.up('lg')]: {
    //     paddingLeft: theme.spacing(2),
    //     paddingRight: theme.spacing(2)
    // }
}))

export default function MainLayout() {
    const [open, setOpen] = useState(false)

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
            <CssBaseline />
            {/* <Container maxWidth='lg' > */}
            <Header />
            <Stack direction={'row'} >
                <DashboardSidebar />
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
            {/* <Box
                    component="footer"
                // sx={{
                //     width: '100%',
                //     textAlign: 'center',
                //     p: 2,
                //     mt: 'auto',
                //     backgroundColor: 'background.paper',
                // }}
                >
                </Box> */}
            {/* </Container> */}
            <Footer />
        </Stack>
    )
}