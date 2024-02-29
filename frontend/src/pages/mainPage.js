import React, { useState } from 'react'
import { Stack, Typography, Button, Box, Popover, Divider } from "@mui/material"
import { useNavigate } from "react-router-dom"
import Header from "../components/header"
import ParallaxMousemove from '../components/parallerX/ParallaxMousemove'
import useResponsive from '../hooks/useResponsive'
import CategoryServices from '../components/company/categoryServices/categoryServices'
import CardCarousel from '../components/company/cardCarousel'
import { companyServiceData } from '../utils/basicData'
import OurServices from '../components/company/ourServices.js'
import Footer from '../components/footer.js'
import AboutSection from '../components/company/aboutSection.js'
import ContactUs from '../components/company/contactUs.js'
import HeroSection from '../components/company/heroSection.js'
import DrawerMenu from '../components/drawerMenu.js'


export function MainPage() {
    const isDesktop = useResponsive('up', 'lg')
    return (
        <Box>
            <MainHeader />
            {/* <Box>
                {
                    isDesktop === true ? (
                        <Stack alignItems={'center'}
                            sx={{ height: "86vh" }}
                        >
                            <ParallaxMousemove />
                        </Stack>
                    ) : (
                        <Stack alignItems={'center'}
                            justifyContent={'center'}
                            sx={{ height: '400px' }}
                        >
                            <Typography
                                sx={{
                                    border: "2px dashed black",
                                    borderRadius: '4px',
                                    fontSize: 38, fontWeight: 600,
                                    textAlign: 'center',
                                    // width: '100%',
                                    p: 0.6
                                }}
                            >Welcome to DKRIN</Typography>
                        </Stack>
                    )
                }
            </Box> */}
            <HeroSection />
            {/* {
                isDesktop === true ? (
                    <CategoryServices />
                ) : (
                    <CardCarousel cards={companyServiceData} />
                )
            } */}
            {/* <Box sx={{ height: '100vh', bgcolor: "red" }} > */}
            <CategoryServices />
            {/* </Box> */}
            <OurServices />
            <AboutSection />
            <ContactUs />
            <Footer page="mainpage" />
        </Box>
    )
}

const MainHeader = () => {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <Stack direction={'row'} alignItems={'center'}
            justifyContent={'space-between'}
            sx={{
                bgcolor: "white",
                borderBottom: '1px solid #e0e0e0',
                zIndex: 1,
                width: '100%',
                p: 1
            }} >
            <Box
                component={'img'}
                src='/images/logo.png'
                sx={{ width: { xs: 100, lg: 120 } }}
            />
            <Box
                sx={{ display: { xs: "block", sm: "block", md: "none", lg: 'none' } }}
            >
                <DrawerMenu />
            </Box>
            <Stack direction={'row'} alignItems={'center'} spacing={2} justifyContent={'space-between'}
                sx={{
                    width: '60%',
                    display: { xs: "none", sm: "none", md: "flex", lg: 'flex' }
                }}
            >
                <Stack direction={'row'} spacing={4} >
                    <Typography variant='headerTitleLink' sx={{ cursor: 'pointer', ":hover": { textDecoration: "underline" } }}
                        onClick={() => navigate('/login')}
                    >Find a job</Typography>
                    <Typography variant='headerTitleLink' sx={{ cursor: 'pointer', ":hover": { textDecoration: "underline" } }}
                        onClick={() => navigate('/onboarding/recruiter/login')}
                    >Find a Candidate</Typography>
                    <Typography variant='headerTitleLink' sx={{ cursor: 'pointer', ":hover": { textDecoration: "underline" } }} >Join Us Now</Typography>
                </Stack>
                <Button variant="contained"
                    onClick={() => navigate('/login')}
                    sx={{
                        width: 80, fontWeight: 400,
                        borderRadius: 8, letterSpacing: 0.4
                    }}
                >Login</Button>
            </Stack>
        </Stack>
    )
}