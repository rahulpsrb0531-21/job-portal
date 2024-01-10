import { useState } from "react"
import { styled, alpha } from '@mui/material/styles'
import { Box, Typography, Stack, InputBase } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import Iconify from "./Iconify";

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
            <Typography variant="logo" >W:</Typography>
            <Stack direction={'row'} alignItems={'center'}
                justifyContent={'space-around'}
                sx={{ width: "28%" }}
            >
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <Iconify icon={"iconamoon:notification-fill"} sx={{ width: 24, height: 24 }} />
                <Stack direction={'row'} alignItems={'center'}>
                    <Iconify icon={"mingcute:user-4-fill"} sx={{ width: 32, height: 32 }} />
                    <Iconify icon={"fluent:ios-arrow-24-regular"} sx={{ width: 18, height: 18, transform: "rotate(270deg)" }} />
                </Stack>
            </Stack>
        </Stack>
    )
}
export default Header