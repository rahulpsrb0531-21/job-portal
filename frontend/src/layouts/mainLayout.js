import React, { useState } from "react"
import { Container, Divider, Stack } from "@mui/material"
import { styled } from '@mui/material/styles'
import { Navigate, Outlet, useLocation } from "react-router-dom"
import Header from "../components/header"
import DashboardSidebar from "./dashboard/DashboardSidebar"

const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
});

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
            <RootStyle
                sx={{
                    mt: 8, ml: 1
                    // marginRight: { lg: 10 }, paddingY: { lg: 6 },
                    // bgcolor: 'rgb(250, 250, 251)'
                    // bgcolor: 'white'
                }}
            >
                <DashboardSidebar
                    isOpenSidebar={open} onCloseSidebar={() => setOpen(false)}
                />
                <MainStyle>
                    <Outlet />
                </MainStyle>
            </RootStyle>
            {/* <Divider /> */}
            {/* <Footer /> */}
        </Stack>
    )
}