import { useState } from "react"
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { styled, alpha } from '@mui/material/styles'
import { Box, Typography, Stack, InputBase, Popover, Button, Container } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import Iconify from "./Iconify";
import CandidatePopover from "../layouts/dashboard/candidatePopover";
import DrawerMenu from "./drawerMenu";
import { useSelector } from "react-redux"

const Header = () => {
    const token = localStorage.getItem("access")
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined
    return (
        <Stack direction={'row'} alignItems={'center'}
            sx={{
                bgcolor: "white",
                borderBottom: '1px solid #e0e0e0',
                position: "fixed",
                // position: "sticky",
                left: 0,
                top: 0,
                zIndex: 1,
                width: '100%',
                p: 1.4
            }}
            justifyContent={'space-between'}
        >
            <Box
                component={"img"}
                src="/images/logo.png"
                sx={{
                    width: 100,
                    objectFit: "cover", cursor: "pointer"
                }}
                onClick={() => navigate('/')}
            />

            {/* <Typography>Jobs</Typography>
            <Typography>Profile</Typography>
            <Typography>Applied</Typography> */}

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
                        <CandidatePopover />
                    </Box>
                )
            }

            {/* {
                !token && (
                    <Stack direction={'row'} alignItems={'center'} spacing={2} >
                        <Button variant="contained"
                            onClick={() => navigate('/login')}
                            sx={{
                                width: 130, fontWeight: 400,
                                borderRadius: 8, letterSpacing: 0.4
                            }}
                        >Login</Button>
                        <Button variant="blackButton"
                            onClick={handleClick}
                        >Sign Up</Button>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <Stack spacing={0.8} sx={{ p: 1.4 }} >
                                <Typography sx={{ fontSize: 14, cursor: "pointer" }}
                                    onClick={() => navigate('/login')}
                                >I'm looking for a job</Typography>
                                <Typography sx={{ fontSize: 14, cursor: "pointer" }}
                                    onClick={() => navigate('/onboarding/recruiter/login')}
                                >I'm looking for candidates</Typography>
                            </Stack>
                        </Popover>
                    </Stack>
                )
            } */}
            {/* )
            } */}
        </Stack>
    )
}
export default Header