import { useState } from "react"
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { styled, alpha } from '@mui/material/styles'
import { Box, Typography, Stack, InputBase, Popover, Button, Container } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import Iconify from "../../components/Iconify";
// import CandidatePopover from "../layouts/dashboard/candidatePopover";
// import DrawerMenu from "./drawerMenu";
import { useSelector } from "react-redux"
import AdminApproveModal from "../../pages/adminDashboard/notification/adminApproveModal";

const AdminNavBar = () => {
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
                width: '80%',
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

            {/* {
                token && (

                    <Box
                        sx={{ display: { xs: 'block', md: 'none', lg: "none" } }}
                    >
                        <DrawerMenu />
                    </Box>
                )
            } */}

            {
                token && (

                    <Box
                        sx={{ display: { xs: 'none', md: 'block', lg: "block" } }}
                    >
                        {/* <CandidatePopover /> */}
                        <AdminApproveModal />
                    </Box>
                )
            }
        </Stack>
    )
}
export default AdminNavBar