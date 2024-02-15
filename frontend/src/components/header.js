import { useState } from "react"
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { styled, alpha } from '@mui/material/styles'
import { Box, Typography, Stack, InputBase, Popover, Button } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import Iconify from "./Iconify";
import CandidatePopover from "../layouts/dashboard/candidatePopover";
import DrawerMenu from "./drawerMenu";
import { useSelector } from "react-redux";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        // transition: theme.transitions.create('width'),
        // [theme.breakpoints.up('sm')]: {
        //     width: '12ch',
        //     '&:focus': {
        //         width: '20ch',
        //     },
        // },
    },
}));

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
                    objectFit: "cover", cursor: "pointer"
                }}
                onClick={() => navigate('/')}
            />

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

            {
                !token && (
                    <Stack direction={'row'} alignItems={'center'} spacing={2} >
                        <Button variant="outlined"
                            onClick={() => navigate('/login')}
                        >Log In</Button>
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
            }
            {/* )
            } */}
        </Stack>
    )
}
export default Header