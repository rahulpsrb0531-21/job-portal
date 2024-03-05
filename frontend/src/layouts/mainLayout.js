import React, { useState } from "react"
import { Box, Container, Divider, Stack } from "@mui/material"
import { styled } from '@mui/material/styles'
import { Navigate, Outlet, useLocation } from "react-router-dom"
import Header from "../components/header"
import Footer from "../components/footer"
import DashboardSidebar from "./dashboard/DashboardSidebar"


const MainStyle = styled('div')(({ theme }) => ({
    position: "absolute",
    // left: 120,
    // left: { xs: 0, lg: 120 },
    // flexGrow: 1,
    overflow: 'auto',
    width: "100%",
    backgroundColor: "rgb(255, 255, 255)",
    [theme.breakpoints.up('lg')]: {
        left: 120
    },
    [theme.breakpoints.up('md')]: {
        left: 120
    }
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
            <Header />
            <Stack
                direction={{ xs: "column", lg: 'row' }}
                sx={{
                    mt: 8,
                    ml: 1,
                    overflow: "hidden",
                    // height: '80vh'
                    // minHeight: '100%'
                    // position: "absolute"
                    // bgcolor: "red"

                }}
            >
                <DashboardSidebar />
                <MainStyle>
                    <Outlet />
                </MainStyle>
                {/* <DashboardSidebar device="mobile"/> */}
            </Stack>
            {/* <Divider /> */}
            {/* <Box sx={{ position: "fixed", bottom: 0, width: '100%' }} >
                <Footer />
            </Box> */}
        </Stack>
    )
}