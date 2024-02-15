import { useEffect, useRef, useState } from 'react'
// material
import { alpha } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, MenuItem, Stack, IconButton, Typography, Divider } from '@mui/material'
// components
import MenuPopover from '../../components/MenuPopover'
import Iconify from '../../components/Iconify'
import { logOut } from '../../redux/reducers/authSlice'

// ----------------------------------------------------------------------

export default function RecruiterPopover() {
    const navigate = useNavigate()
    const anchorRef = useRef(null)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const { user } = useSelector((user) => user.auth)
    // console.log(user)
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const logout = () => {
        localStorage.clear()
        dispatch(logOut())
        navigate("/")
    }

    // useEffect(() => { }, [user])

    return (
        <>
            <IconButton
                ref={anchorRef}
                onClick={handleOpen}
            >
                <Iconify icon={"mingcute:user-4-fill"} sx={{ width: 32, height: 32 }} />
                <Iconify icon={"fluent:ios-arrow-24-regular"} sx={{ width: 18, height: 18, transform: "rotate(270deg)" }} />
            </IconButton>

            <MenuPopover
                open={open}
                onClose={handleClose}
                anchorEl={anchorRef.current}
                sx={{
                    mt: 1.5,
                    ml: 0.75,
                    width: 180,
                    '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
                }}
            >
                <Stack spacing={0.75}>
                    <Stack direction={'row'} alignItems={'center'} >
                        <Iconify icon={"mingcute:user-4-fill"} sx={{ width: 32, height: 32 }} />
                        <Typography sx={{ fontSize: 14, fontWeight: 500 }} >{user?.recruiterName || ''}</Typography>
                    </Stack>
                    <Divider />
                    <Stack spacing={0.7} >
                        <Typography sx={{ fontSize: 10, fontWeight: 400 }} >support</Typography>
                        <Typography sx={{ fontSize: 12, fontWeight: 500 }} >Help</Typography>
                        <Typography sx={{
                            fontSize: 12, fontWeight: 500,
                            ":hover": {
                                bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
                                cursor: "pointer"
                            }
                        }}
                            onClick={() => { navigate("/recruiter/profile"); handleClose() }}
                        >Edit Profile</Typography>
                        <Typography
                            onClick={() => logout()}
                            sx={{
                                fontSize: 12, fontWeight: 500,
                                ":hover": {
                                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
                                    cursor: "pointer"
                                }
                            }}
                        >Log out</Typography>
                    </Stack>
                </Stack>
            </MenuPopover>
        </>
    );
}
