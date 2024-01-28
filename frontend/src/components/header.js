import { useState } from "react"
import { Link as RouterLink } from 'react-router-dom'
import { styled, alpha } from '@mui/material/styles'
import { Box, Typography, Stack, InputBase } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import Iconify from "./Iconify";
import CandidatePopover from "../layouts/dashboard/candidatePopover";

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
            <Typography variant="logo" >Logo</Typography>
            <Stack direction={'row'} alignItems={'center'}
                justifyContent={'space-between'}
            // sx={{ width: "100%" }}
            >
                {/* <Stack direction={'row'} justifyContent={"right"} spacing={4} sx={{ width: "100%", px: 2 }} >
                    <Typography component={RouterLink}
                        to='/jobs/home'
                        sx={{
                            fontSize: 16, fontWeight: 700, textDecoration: "none", color: "black"
                            , '&:hover': {
                                color: "black",
                                textDecoration: "underline"
                            }
                        }}>Home</Typography>
                    <Typography component={RouterLink}
                        to='/jobs/profile'
                        sx={{
                            fontSize: 16, fontWeight: 700, textDecoration: "none", color: "black"
                            , '&:hover': {
                                color: "black",
                                textDecoration: "underline"
                            }
                        }}
                    >Profile</Typography>
                    <Typography component={RouterLink}
                        to='/jobs/lists'
                        sx={{
                            fontSize: 16, fontWeight: 700, textDecoration: "none", color: "black"
                            , '&:hover': {
                                color: "black",
                                textDecoration: "underline"
                            }
                        }}
                    >Job</Typography>
                    <Typography component={RouterLink}
                        to='/jobs/applications'
                        sx={{
                            fontSize: 16, fontWeight: 700, textDecoration: "none", color: "black"
                            , '&:hover': {
                                color: "black",
                                textDecoration: "underline"
                            }
                        }}
                    >Applied</Typography>
                </Stack> */}
                <Stack direction={'row'} alignItems={'center'}>
                    {/* <Iconify icon={"mingcute:user-4-fill"} sx={{ width: 32, height: 32 }} />
                    <Iconify icon={"fluent:ios-arrow-24-regular"} sx={{ width: 18, height: 18, transform: "rotate(270deg)" }} /> */}
                    <CandidatePopover />
                </Stack>
            </Stack>
        </Stack>
    )
}
export default Header