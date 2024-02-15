import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Typography, Popover } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// components
//
import Iconify from '../../components/Iconify';
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
    backgroundColor: '#FFFFFF',
    [theme.breakpoints.up('lg')]: {
        width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
    },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    minHeight: APPBAR_MOBILE,
    [theme.breakpoints.up('lg')]: {
        minHeight: APPBAR_DESKTOP,
        padding: theme.spacing(0, 5),
    },
}));

// ----------------------------------------------------------------------

AdminNavbar.propTypes = {
    onOpenSidebar: PropTypes.func,
};

export default function AdminNavbar({ onOpenSidebar }) {

    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    //   const logout = () =>{
    //     dispatch(resetDeveloper())
    //     sessionStorage.clear();
    //     navigate("/")
    //   }
    //   const { decodedToken, isExpired } = useJwt(sessionStorage.getItem("access"));
    //   if(isExpired){
    //     logout()
    //   }

    return (
        <RootStyle>
            <ToolbarStyle>
                <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}>
                    <Iconify icon="eva:menu-2-fill" />
                </IconButton>

                <Box sx={{ flexGrow: 1 }} />
                <Box width={'0.16rem'} height={'1.5rem'} bgcolor='#BCBCCB ' mr={'1rem'} />
                <Stack direction={'row'} alignItems='center'  >
                    <Typography variant='navHeading' color={'black'}>
                        admin
                        {/* {JSON.parse(sessionStorage.getItem("user"))?.username} */}
                    </Typography>
                    <Iconify onClick={handleClick} icon={'bxs:down-arrow'} width={18} marginLeft='0.5rem' height={18} color='#BCBCCB' />
                    {/* <KeyboardArrowDownIcon width={22} height={22}  color='red' /> */}
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}

                    >
                        <Stack sx={{ width: 190 }}>
                            <Stack direction={'row'} alignItems='center' py={2.1}  >
                                <Iconify icon={'bx:user'} width={18} marginLeft={2} height={18} color='#BCBCCB' />
                                <Typography sx={{ fontSize: 15, pl: 1 }} >
                                    admin
                                    {/* {JSON.parse(sessionStorage.getItem("user"))?.username} */}
                                </Typography>
                            </Stack>
                            <Stack
                                // onClick={logout}
                                sx={{ cursor: 'pointer' }} direction={'row'} alignItems='center' py={2.1} >
                                <Iconify icon={'carbon:logout'} width={18} marginLeft={2} height={18} color='#BCBCCB' />
                                <Typography sx={{ fontSize: 15, pl: 1 }} >Logout</Typography>
                            </Stack>
                        </Stack>
                    </Popover>
                </Stack>
            </ToolbarStyle>
        </RootStyle>
    );
}
