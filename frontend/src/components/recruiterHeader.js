import { useState } from "react"
import { NavLink as RouterLink, useNavigate } from 'react-router-dom'
import { styled, alpha } from '@mui/material/styles'
import { Box, Typography, Stack, InputBase } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import Iconify from "./Iconify";
import RecruiterPopover from "../layouts/recruiter/recruiterPopover";
import DrawerMenu from "./drawerMenu";


const RecruiterHeader = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('access')

    const linkData = [
        {
            linkName: "Dashboard",
            path: '/recruiter/dashboard'
        },
        {
            linkName: "Jobs",
            path: '/recruiter/jobs'
        },
        {
            linkName: "Applicant",
            path: '/recruiter/applicant'
        }
    ]

    return (
        <Stack direction={'row'} alignItems={'center'}
            sx={{
                // bgcolor: "rgba(255,255,255,0.6)",
                bgcolor: "white",
                borderBottom: '1px solid #e0e0e0',
                position: "fixed",
                left: 0,
                top: 0,
                // transition: "background 0.5s ease",
                zIndex: 1,
                width: '100%',
                p: 1
            }}
            justifyContent={'space-between'}
        >
            <Box
                component={"img"}
                src="/images/logo.png"
                sx={{
                    width: 100,
                    objectFit: "cover",
                    cursor: "pointer"
                }}
                onClick={() => navigate("/")}
            />

            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}
                sx={{
                    width: '20%',
                    display: { xs: 'none', md: 'flex', lg: "flex" }
                }}
            >
                {
                    linkData?.map((data, idx) => (
                        <Typography
                            component={RouterLink}
                            to={data?.path}
                            sx={{ fontSize: 14, fontWeight: 500, color: "black", textDecoration: "none" }} >{data?.linkName}</Typography>
                    ))
                }
            </Stack>
            <Stack direction={'row'} alignItems={'center'}
                justifyContent={'space-around'}
            // sx={{ width: "4%" }}
            >
                {/* <Stack direction={'row'} alignItems={'center'}>
                    <RecruiterPopover />
                </Stack> */}
                {
                    token && (

                        <Box
                            sx={{ display: { xs: 'block', md: 'none', lg: "none" } }}
                        >
                            <DrawerMenu />
                        </Box>
                    )
                }

                {
                    token && (

                        <Box
                            sx={{ display: { xs: 'none', md: 'block', lg: "block" } }}
                        >
                            <RecruiterPopover />
                        </Box>
                    )
                }
            </Stack>
        </Stack>
    )
}
export default RecruiterHeader