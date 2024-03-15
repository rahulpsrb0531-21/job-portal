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
    // width: "80%",
    backgroundColor: "rgb(255, 255, 255)",
    // backgroundColor: "red",
    [theme.breakpoints.up('lg')]: {
        left: 40
    },
    [theme.breakpoints.up('md')]: {
        left: 30
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
            sx={{
                "& .MuiBox-root": {
                    height: 'auto', overflow: 'hidden',
                },
                // bgcolor: 'rgb(250, 250, 251)'
            }}
        >
            <CssBaseline />

            <Header />
            <Stack
                direction={{ xs: "column", lg: 'row' }}
                sx={{
                    mt: 9,
                    ml: 1,
                    mb: 4,
                    overflow: "hidden",
                    // height: '80vh'
                    // minHeight: '100%'
                    // position: "absolute"
                    // bgcolor: "red"

                }}
            >
                <DashboardSidebar />
                <MainStyle sx={{ width: { xs: '100%', sm: '100%', md: '80%', lg: '80%' } }} >
                    <Outlet />
                </MainStyle>
                {/* <DashboardSidebar device="mobile"/> */}
            </Stack>
            {/* <Divider /> */}
            {/* <Box sx={{ position: "static", bottom: 0, width: '100%' }} >
                <Footer />
            </Box> */}
            <Footer />
        </Stack>
    )
}