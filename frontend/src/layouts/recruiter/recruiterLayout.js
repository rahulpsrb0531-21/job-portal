import React, { useState } from "react"
import { Container, Divider, Stack } from "@mui/material"
import { styled } from '@mui/material/styles'
import { Navigate, Outlet, useLocation } from "react-router-dom"
// import Header from "../components/header"
// import DashboardSidebar from "./dashboard/DashboardSidebar"
import RecruiterSidebar from "./recruiterSidebar"
import RecruiterHeader from "../../components/recruiterHeader"
// import Footer from "../components/footer"

const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden',
    // marginLeft: { xs: 0, lg: 160 },
    // backgroundColor: 'red'
});

const MainStyle = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    // minHeight: '10%',
    // paddingTop: 9,
    // paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
        // paddingTop: APP_BAR_DESKTOP + 24,
        // paddingLeft: theme.spacing(2),
        // paddingRight: theme.spacing(2)
    },
    // backgroundColor: 'red'
}));

export default function RecruiterLayout() {
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
            <RecruiterHeader />
            <RootStyle
                sx={{
                    mt: 8
                    // marginRight: { lg: 10 },
                    // paddingY: { lg: 6 },
                    // bgcolor: 'rgb(250, 250, 251)'
                    // bgcolor: 'white'
                }}
            >
                {/* <DashboardSidebar
                    isOpenSidebar={open} onCloseSidebar={() => setOpen(false)}
                /> */}
                {/* <RecruiterSidebar
                    isOpenSidebar={open} onCloseSidebar={() => setOpen(false)}
                /> */}
                <MainStyle>
                    <Outlet />
                </MainStyle>
            </RootStyle>
            {/* <Divider /> */}
            {/* <Footer /> */}
        </Stack>
    )
}