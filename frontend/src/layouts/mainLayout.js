import React, { useState } from "react"
import { Container, Divider, Stack } from "@mui/material"
import { styled } from '@mui/material/styles'
import { Navigate, Outlet, useLocation } from "react-router-dom"
import Header from "../components/header"
import DashboardSidebar from "./dashboard/DashboardSidebar"


const MainStyle = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
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
                    minHeight: '100%'
                }}
            >
                <DashboardSidebar />
                <MainStyle>
                    <Outlet />
                </MainStyle>
                {/* <DashboardSidebar device="mobile"/> */}
            </Stack>
            {/* <Divider /> */}
            {/* <Footer /> */}
        </Stack>
    )
}