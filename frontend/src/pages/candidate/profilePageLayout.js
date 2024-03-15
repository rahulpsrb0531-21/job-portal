import React, { useEffect, useState } from "react"
import { Box, Container, CssBaseline, Divider, Stack, Tab, Tabs, Typography } from "@mui/material"
import { styled } from '@mui/material/styles'
import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import { TabContext, TabList } from "@mui/lab"


const MainStyle = styled('div')(({ theme }) => ({
    position: "relative",
    // position: "absolute",
    // left: 120,
    // left: { xs: 0, lg: 120 },
    flexGrow: 1,
    overflow: 'hidden',
    width: "80%",
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

export default function ProfilePageLayout() {
    const navigate = useNavigate()

    const location = useLocation()
    // console.log('sfhjkl', location.pathname)

    const [open, setOpen] = useState(false)

    const [value, setValue] = useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        setValue(location.pathname)
        // setValue("/candidate/profile/overview")
        // navigate("/candidate/profile/overview")
    }, [])


    return (
        <Stack
            sx={{
                "& .MuiBox-root": {
                    height: 'auto', overflow: 'hidden',
                },
            }}
        >
            <CssBaseline />
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab
                                sx={{ fontSize: 16, fontWeight: 500, color: "black" }}
                                component={Link} to='/candidate/profile/overview'
                                label="Overview" value="/candidate/profile/overview" />

                            <Tab component={Link} to='/candidate/profile/edit-profile'
                                sx={{ fontSize: 16, fontWeight: 500, color: "black" }}
                                label="Profile" value="/candidate/profile/edit-profile" />

                            <Tab component={Link} to='/candidate/profile/resume'
                                label="Resume/CV" value="/candidate/profile/resume" />

                            <Tab component={Link} to='/candidate/profile/preferences'
                                label="Preferences" value="/candidate/profile/preferences" />

                            <Tab component={Link} to='/candidate/profile/other-documents'
                                label="Other Documents" value="/candidate/profile/other-documents" />
                            {/* <Tab label="Item Three" value="3" /> */}
                        </TabList>
                    </Box>
                </TabContext>
            </Box>
            <MainStyle >
                <Outlet />
            </MainStyle>
        </Stack>
    )
}