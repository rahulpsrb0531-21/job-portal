import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IconButton, Drawer, Stack, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Iconify from './Iconify';
import { useDispatch, useSelector } from 'react-redux';
import navConfig from '../layouts/dashboard/NavConfig';
import { logOut } from '../redux/reducers/authSlice';

const DrawerMenu = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const { user } = useSelector((state) => state.auth)

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    }

    const logout = () => {
        localStorage.clear()
        dispatch(logOut())
        navigate("/")
        toggleDrawer()
    }

    return (
        <>
            <IconButton onClick={toggleDrawer} color="inherit">
                <Iconify icon={"material-symbols:menu"} />
            </IconButton>
            <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
                <motion.div
                    // initial={{ x: -300 }}
                    animate={{ x: 0 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                    style={{ width: '250px' }}
                >
                    <Stack>
                        <Stack direction={'row'} spacing={1} alignItems={'center'}
                            sx={{
                                bgcolor: "black", color: "white", height: 80, borderBottomRightRadius: '8px', pl: 2
                            }}
                        >
                            <Iconify icon={"mingcute:user-4-fill"} sx={{ width: 34, height: 34 }} />
                            <Typography>{user?.candidateName}</Typography>
                        </Stack>
                        <Stack spacing={2} sx={{ p: 2 }} >
                            {
                                navConfig?.map((data, idx) => (
                                    <Stack
                                        direction={'row'} spacing={1}
                                        onClick={() => { navigate(`${data?.path}`); toggleDrawer() }}
                                    >
                                        <Iconify icon={data?.icon} sx={{ width: 32, height: 32 }} />
                                        <Typography>{data?.title}</Typography>
                                    </Stack>
                                ))
                            }
                        </Stack>
                        <Button variant='outlined' sx={{ mx: 1, mt: 2 }}
                            onClick={() => logout()}
                        >Log out</Button>
                    </Stack>
                </motion.div>
            </Drawer>
        </>
    );
};

export default DrawerMenu;
